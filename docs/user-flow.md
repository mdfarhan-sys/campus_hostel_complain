# User Flow & System Lifecycle Specifications

## 1. System Roles & Access Matrix

| Role | Primary Functions | Key Authentication / Access Level |
| :--- | :--- | :--- |
| **Reporter** *(Student / Faculty / Visitor)* | Scans asset QR code, logs anonymous issue, upvotes existing feed complaints, tracks status, verifies technician repairs, reopens unresolved tickets. | Anonymous / Low-friction OAuth (Optional for verification tracking) |
| **Technician / Service Team** | Receives real-time push/SMS task assignments, updates repair progress, uploads mandatory photo proof of work, logs used parts/time. | Role-Based Authentication (Mobile Maintenance WebApp/PWA) |
| **Department Admin / Supervisor** | Monitors ticket SLA compliance, manually reassigns stuck tickets, manages asset inventory, reviews disputed resolutions, generates audit reports. | Authenticated Dashboard Access (Full Department / System Authority) |
| **System Engine (Automated)** | Auto-routes tickets by department, calculates real-time upvote priority scores, triggers SLA timeout escalations, processes 48-hour auto-closures. | Background Workers & Scheduled Cron Jobs |

---

## 2. Core End-to-End System Flowchart

```mermaid
flowchart TD
    %% Node Definitions
    Start([User Scans Asset QR Code]) --> AssetCheck{Asset Found in System?}
    
    AssetCheck -- No --> ErrorScan[Display Invalid QR / Manual Search Prompt]
    AssetCheck -- Yes --> TicketCheck{Active Open Ticket Exists?}

    %% Path 1: Existing Ticket
    TicketCheck -- Yes --> ViewExisting[Show Active Ticket & Current Status]
    ViewExisting --> UpvoteAction[User Clicks 'Upvote / Me Too']
    UpvoteAction --> UpdatePriority[Recalculate Ticket Priority Score]

    %% Path 2: New Ticket Creation
    TicketCheck -- No --> Form[Open Pre-Filled Complaint Form]
    Form --> Submit[User Submits Complaint + Optional Image]
    Submit --> Broadcast[Publish to Campus Live Feed]
    Broadcast --> PriorityQueue[Add to Department Service Queue]

    %% Task Assignment & Execution
    PriorityQueue --> AutoAssign{Auto-Assign Available?}
    UpdatePriority --> SLA_Check{SLA Exceeded?}
    SLA_Check -- Yes --> Escalation[Escalate to Admin Dashboard]
    Escalation --> ManualAssign[Admin Manually Assigns Technician]
    AutoAssign -- Yes --> TechNotif[Notify Technician]
    AutoAssign -- No --> ManualAssign
    ManualAssign --> TechNotif

    %% Repair Phase
    TechNotif --> WorkInProgress[Technician Accepts & Marks 'In Progress']
    WorkInProgress --> RepairDone[Technician Completes Physical Fix]
    RepairDone --> UploadProof[Upload Required Photo Proof of Repair]
    UploadProof --> PendingVerify[Status Updated to 'Pending Verification']

    %% Verification Loop
    PendingVerify --> NotifyReporter[Notify Reporter & Community Upvoters]
    NotifyReporter --> VerifyCheck{Student Verifies Fix?}

    VerifyCheck -- Confirmed / Approved --> ClosedResolved([Ticket Status: Closed - Resolved])
    VerifyCheck -- Timeout 48 Hrs --> AutoClosed([Ticket Status: Auto-Closed])
    VerifyCheck -- Rejected / Unresolved --> Reopened[Status: Reopened & Escalated]
    Reopened --> Escalation