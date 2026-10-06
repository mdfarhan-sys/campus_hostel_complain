# CampusFix — Hostel & Campus Complaint Management System

> **“Report It. Track It. Fix It.”**  
> A modern, student-driven SaaS platform engineered to eliminate bureaucratic friction and streamline facility complaint management in colleges and hostels.

---

## Table of Contents
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Prerequisites](#prerequisites)
- [Quick Start & Installation](#quick-start--installation)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Demo Accounts](#demo-accounts)
- [API Documentation](#api-documentation)
- [Complaint Lifecycle Workflow](#complaint-lifecycle-workflow)
- [Seeding Test Data](#seeding-test-data)
- [License](#license)

---

## Key Features

- **Responsive Modern UI**: Nature-inspired minimalist palette (deep forest green `#173D2B`, sage `#AFC69A`, cream `#F7F6EE`), rounded cards, and smooth micro-animations.
- **Fast Ticket Submission**: Submit detailed hostel/campus complaints with category tagging, room location, urgency levels, and optional photo proofs.
- **Real-Time Step-by-Step Tracker**: 5-stage live resolution timeline (`Reported` -> `Under Review` -> `Assigned` -> `In Progress` -> `Resolved`).
- **Community Upvoting ("Me Too")**: Students can upvote active issues to automatically boost priority scores.
- **Student Verification Loop**: Reporters can verify technician fixes (`Closed`) or dispute incomplete repairs (`Reopened`).
- **Role-Based Access Control (RBAC)**: Dedicated permissions for Students, Technicians, Wardens, and Administrators.
- **Resilient Database Layer**: Works with MongoDB (local or Atlas) and includes an automatic in-memory fallback for zero-friction local development.

---

## Tech Stack

### Frontend (`client/`)
- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Plus Jakarta Sans & Inter

### Backend (`server/`)
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens) + [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **File Uploads**: [Multer](https://github.com/expressjs/multer)
- **Logging**: Morgan

---

## Project Architecture

```
campus_hostel_complain/
├── client/                     # Frontend React + Vite application
│   ├── public/
│   ├── src/
│   │   ├── components/         # Navbar, Footer, Button, StatCard, IssueCard, etc.
│   │   ├── pages/              # Home, About, Issues, TrackIssue, ReportIssue, Contact, Login
│   │   ├── services/           # Frontend API client (api.js)
│   │   ├── data/               # Static categories and feature data
│   │   ├── App.jsx             # Main routing layout
│   │   ├── main.jsx            # React root mount
│   │   └── index.css           # Tailwind base styles and design tokens
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js          # Reverse proxy configuration (/api -> port 5000)
│   └── package.json
│
├── server/                     # Backend Express REST API
│   ├── config/
│   │   └── db.js               # MongoDB connection + resilient local store fallback
│   ├── controllers/            # Auth, Complaints, Stats, and Contact controllers
│   ├── middleware/             # JWT Protect, Role Authorization, Multer Upload, Error Handlers
│   ├── models/                 # User, Complaint, and Inquiry Mongoose schemas
│   ├── routes/                 # Express API routes
│   ├── seed/                   # Pre-seeded test accounts and seed script
│   ├── utils/                  # Token generator & CF-2026-XXXXX ID generator
│   ├── .env.example            # Environment template
│   ├── package.json
│   └── server.js               # Express application entrypoint
│
├── docs/                       # Specifications and user-flow.md
├── design/                     # Design reference mockups
├── package.json                # Root package runner scripts
├── .gitignore                  # Fullstack gitignore rules
└── README.md
```

---

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)
- *(Optional)* [MongoDB Community Server](https://www.mongodb.com/try/download/community) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URL.

---

## Quick Start & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Bhumieee/campus_hostel_complain.git
cd campus_hostel_complain
```

### 2. Install All Dependencies
You can install both client and server packages with one command from the project root:
```bash
npm run install:all
```
*Or install separately:*
```bash
cd client && npm install
cd ../server && npm install
cd ..
```

---

## Environment Configuration

Create a `.env` file inside the `server/` directory:

```bash
cp server/.env.example server/.env
```

Default configuration in `server/.env`:
```env
PORT=5000
NODE_ENV=development

# MongoDB Connection String (Local or MongoDB Atlas)
MONGO_URI=mongodb://127.0.0.1:27017/campusfix

# JWT Secret & Expiration
JWT_SECRET=campusfix_jwt_secret_key_2026_super_secure_token
JWT_EXPIRE=30d

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

> **Note on MongoDB:**  
> If MongoDB is not running locally, CampusFix automatically operates in **Resilient Local Store mode**, allowing you to test all API endpoints, authentication, and ticket tracking without extra setup.

---

## Running the Application

You can run both the frontend and backend simultaneously or independently.

### Option A: From the Root Directory (Recommended)
Open two terminal tabs:

**Terminal 1 — Frontend Client:**
```bash
npm run dev
# Vite runs at: http://localhost:5173
```

**Terminal 2 — Backend Server:**
```bash
npm run server
# Express runs at: http://localhost:5000
```

---

### Option B: Running from Individual Folders

**Frontend:**
```bash
cd client
npm run dev
```

**Backend:**
```bash
cd server
npm start          # Production node execution
# or
npm run dev        # Hot-reloading with nodemon
```

---

## Demo Accounts

The system comes pre-seeded with test accounts ready to use on the `/login` page:

| Role | University Email / ID | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Student** | `aarav.sharma@campus.edu` / `2023CSB1042` | `studentPass2026` | Report issues, upvote, verify resolution |
| **Hostel Warden** | `warden.satpura@campus.edu` / `FAC-WAR-09` | `wardenPass2026` | Review complaints, assign technicians, update milestones |
| **Campus Technician** | `ramesh.plumber@campus.edu` | `techPass2026` | Advance status (`In Progress` -> `Resolved`), upload repair proofs |
| **Dean / Admin** | `admin.affairs@campus.edu` | `wardenPass2026` | Full system audit and staff management |

> *Tip: Use the **"Auto-Fill Student"** or **"Auto-Fill Warden"** buttons on the Login page for one-click testing without typing.*

---

## API Documentation

Base URL: `http://localhost:5000/api`

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register student or staff user |
| `POST` | `/api/auth/login` | Public | Login with email/ID and password, returns JWT |
| `GET` | `/api/auth/me` | Protected | Get authenticated profile |
| `GET` | `/api/auth/staff` | Warden/Admin | Retrieve active technicians & wardens directory |

### Complaints & Tracking (`/api/complaints`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/complaints` | Public | List complaints with category, status, and search filters |
| `POST` | `/api/complaints` | Public / Auth | Submit complaint (auto-generates `CF-2026-XXXXX` code) |
| `GET` | `/api/complaints/:id` | Public | Track ticket by complaint ID (e.g. `CF-2026-00124`) |
| `PATCH`| `/api/complaints/:id/status`| Staff/Warden | Advance milestone (`Reported` -> `In Progress` -> `Resolved`) |
| `POST` | `/api/complaints/:id/upvote`| Public | Community upvote ("Me Too") counter |
| `POST` | `/api/complaints/:id/verify`| Student | Verification loop (`approve` fix or `reopen` ticket) |

### Metrics & Contact (`/api/stats` & `/api/contact`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/stats` | Public | Campus resolution metrics and turnaround stats |
| `POST` | `/api/contact` | Public | Submit helpdesk contact inquiries |
| `GET` | `/api/health` | Public | System status health check |

---

## Complaint Lifecycle Workflow

```
[Student Reports Issue]
         │
         ▼
[CF-2026-XXXXX Ticket Created] ──(Campus Transparency Board)
         │
         ▼
  [Under Review] ◄─── Warden Verifies Priority & Building
         │
         ▼
    [Assigned] ─────► Plumber / Electrician / Maintenance Cell
         │
         ▼
   [In Progress] ───► Physical Repair Underway
         │
         ▼
    [Resolved] ─────► Technician Completes Work
         │
         ▼
 [Student Verification Loop]
     ├── Approved ──► [Ticket Closed]
     └── Disputed ──► [Reopened & Escalated]
```

---

## Seeding Test Data

If using MongoDB and you wish to reset or seed fresh test data:
```bash
npm run seed
```

---

## License
This project is open-source and available under the [ISC License](LICENSE).
