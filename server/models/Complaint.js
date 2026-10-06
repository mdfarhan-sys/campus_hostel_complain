import mongoose from 'mongoose';

const timelineMilestoneSchema = new mongoose.Schema({
  step: {
    type: String,
    required: true,
    enum: ['Reported', 'Under Review', 'Assigned', 'In Progress', 'Resolved', 'Closed', 'Reopened'],
  },
  date: {
    type: String,
    default: () => new Date().toLocaleString(),
  },
  note: {
    type: String,
    default: '',
  },
  updatedBy: {
    type: String,
    default: 'System',
  },
});

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide an issue summary title'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please select an issue category'],
      enum: [
        'Water Supply',
        'Wi-Fi',
        'Electricity',
        'Cleanliness',
        'Mess Services',
        'Room Maintenance',
        'Furniture',
        'Other',
      ],
    },
    categorySlug: {
      type: String,
      lowercase: true,
    },
    hostel: {
      type: String,
      required: [true, 'Please specify the hostel or building'],
    },
    roomNumber: {
      type: String,
      required: [true, 'Please specify the room number or area'],
    },
    studentName: {
      type: String,
      required: [true, 'Please specify student name'],
    },
    studentId: {
      type: String,
      required: [true, 'Please specify student ID / roll number'],
    },
    studentUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Reported', 'Under Review', 'Assigned', 'In Progress', 'Resolved', 'Closed', 'Reopened'],
      default: 'Reported',
      index: true,
    },
    currentStepIndex: {
      type: Number,
      default: 0, // 0: Reported, 1: Under Review, 2: Assigned, 3: In Progress, 4: Resolved
    },
    description: {
      type: String,
      required: [true, 'Please provide issue details'],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    proofImageUrl: {
      type: String,
      default: '',
    },
    assignedTo: {
      type: String,
      default: 'Campus Operations Desk (Queued)',
    },
    assignedTechnician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    expectedResolution: {
      type: String,
      default: 'Within 24–48 hours',
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    upvotedBy: [
      {
        type: String,
      },
    ],
    verificationStatus: {
      type: String,
      enum: ['Pending', 'Verified', 'Disputed'],
      default: 'Pending',
    },
    timeline: [timelineMilestoneSchema],
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
