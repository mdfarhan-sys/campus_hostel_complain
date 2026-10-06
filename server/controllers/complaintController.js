import Complaint from '../models/Complaint.js';
import { generateComplaintId } from '../utils/idGenerator.js';
import { isConnectedToMongo } from '../config/db.js';
import { inMemoryComplaints } from '../seed/memoryStore.js';

const STATUS_STEPS = {
  'Reported': 0,
  'Under Review': 1,
  'Assigned': 2,
  'In Progress': 3,
  'Resolved': 4,
  'Closed': 4,
  'Reopened': 1,
};

// @desc    Create a new complaint ticket
// @route   POST /api/complaints
// @access  Public / Optional Auth
export const createComplaint = async (req, res, next) => {
  try {
    const {
      title,
      category,
      hostel,
      roomNumber,
      studentName,
      studentId,
      priority = 'Medium',
      description,
      expectedResolution = 'Within 24–48 hours',
    } = req.body;

    if (!title || !category || !hostel || !studentName || !studentId || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required complaint fields',
      });
    }

    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    if (isConnectedToMongo) {
      // Calculate sequence count
      const totalCount = await Complaint.countDocuments();
      const complaintId = generateComplaintId(totalCount + 125);

      const complaint = await Complaint.create({
        complaintId,
        title,
        category,
        categorySlug,
        hostel,
        roomNumber: roomNumber || 'General Area',
        studentName,
        studentId,
        studentUser: req.user ? req.user._id : null,
        priority,
        status: 'Reported',
        currentStepIndex: 0,
        description,
        imageUrl,
        expectedResolution,
        timeline: [
          {
            step: 'Reported',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            note: `Submitted by ${studentName} (${studentId})`,
            updatedBy: studentName,
          },
        ],
      });

      return res.status(201).json({
        success: true,
        message: 'Complaint submitted successfully',
        data: complaint,
      });
    } else {
      // In-memory fallback
      const complaintId = generateComplaintId(inMemoryComplaints.length + 125);
      const newComplaint = {
        _id: `comp_${Date.now()}`,
        complaintId,
        title,
        category,
        categorySlug,
        hostel,
        roomNumber: roomNumber || 'General Area',
        studentName,
        studentId,
        studentUser: req.user ? req.user._id : null,
        priority,
        status: 'Reported',
        currentStepIndex: 0,
        description,
        imageUrl,
        proofImageUrl: '',
        assignedTo: 'Campus Operations Desk (Queued)',
        expectedResolution,
        upvotes: 0,
        upvotedBy: [],
        verificationStatus: 'Pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        timeline: [
          {
            step: 'Reported',
            date: 'Just now',
            note: `Submitted by ${studentName} (${studentId})`,
            updatedBy: studentName,
          },
        ],
      };

      inMemoryComplaints.unshift(newComplaint);

      return res.status(201).json({
        success: true,
        message: 'Complaint submitted successfully',
        data: newComplaint,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all complaints with search and filters
// @route   GET /api/complaints
// @access  Public
export const getComplaints = async (req, res, next) => {
  try {
    const { category, status, priority, hostel, search, sort = 'recent', limit = 50, page = 1 } = req.query;

    if (isConnectedToMongo) {
      const query = {};

      if (category && category !== 'All') {
        query.category = new RegExp(`^${category}$`, 'i');
      }

      if (status && status !== 'All') {
        query.status = status;
      }

      if (priority && priority !== 'All') {
        query.priority = priority;
      }

      if (hostel) {
        query.hostel = new RegExp(hostel, 'i');
      }

      if (search) {
        query.$or = [
          { complaintId: new RegExp(search, 'i') },
          { title: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
          { studentName: new RegExp(search, 'i') },
          { studentId: new RegExp(search, 'i') },
          { hostel: new RegExp(search, 'i') },
        ];
      }

      const sortOptions = sort === 'upvotes' 
        ? { upvotes: -1, createdAt: -1 } 
        : { createdAt: -1 };

      const skip = (Number(page) - 1) * Number(limit);
      const total = await Complaint.countDocuments(query);
      const complaints = await Complaint.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit));

      return res.json({
        success: true,
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        count: complaints.length,
        data: complaints,
      });
    } else {
      // In-memory fallback
      let filtered = [...inMemoryComplaints];

      if (category && category !== 'All') {
        filtered = filtered.filter(
          (c) => c.category.toLowerCase() === category.toLowerCase()
        );
      }

      if (status && status !== 'All') {
        filtered = filtered.filter(
          (c) => c.status.toLowerCase() === status.toLowerCase()
        );
      }

      if (priority && priority !== 'All') {
        filtered = filtered.filter((c) => c.priority.toLowerCase() === priority.toLowerCase());
      }

      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.complaintId.toLowerCase().includes(q) ||
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.hostel.toLowerCase().includes(q)
        );
      }

      if (sort === 'upvotes') {
        filtered.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
      }

      return res.json({
        success: true,
        total: filtered.length,
        page: 1,
        pages: 1,
        count: filtered.length,
        data: filtered,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get single complaint by ID or tracking code (e.g. CF-2026-00124)
// @route   GET /api/complaints/:id
// @access  Public
export const getComplaintByIdOrTrackingId = async (req, res, next) => {
  try {
    const param = req.params.id.trim();

    if (isConnectedToMongo) {
      let complaint;
      if (param.toUpperCase().startsWith('CF-')) {
        complaint = await Complaint.findOne({ complaintId: param.toUpperCase() });
      } else {
        complaint = await Complaint.findById(param);
      }

      if (!complaint) {
        return res.status(404).json({
          success: false,
          message: `Complaint ticket '${param}' not found`,
        });
      }

      return res.json({ success: true, data: complaint });
    } else {
      const complaint = inMemoryComplaints.find(
        (c) =>
          c.complaintId.toUpperCase() === param.toUpperCase() ||
          c._id === param
      );

      if (!complaint) {
        return res.status(404).json({
          success: false,
          message: `Complaint ticket '${param}' not found`,
        });
      }

      return res.json({ success: true, data: complaint });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update complaint status & timeline
// @route   PATCH /api/complaints/:id/status
// @access  Private (Technician, Warden, Admin)
export const updateComplaintStatus = async (req, res, next) => {
  try {
    const { status, note, assignedTo } = req.body;
    const param = req.params.id;

    if (!status || !STATUS_STEPS.hasOwnProperty(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${Object.keys(STATUS_STEPS).join(', ')}`,
      });
    }

    const currentStepIndex = STATUS_STEPS[status];
    const updaterName = req.user?.name || 'Staff Supervisor';

    const milestone = {
      step: status,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      note: note || `Status updated to ${status} by ${updaterName}`,
      updatedBy: updaterName,
    };

    if (isConnectedToMongo) {
      const updateFields = {
        status,
        currentStepIndex,
        $push: { timeline: milestone },
      };

      if (assignedTo) {
        updateFields.assignedTo = assignedTo;
      }

      const query = param.toUpperCase().startsWith('CF-') ? { complaintId: param.toUpperCase() } : { _id: param };
      const updated = await Complaint.findOneAndUpdate(query, updateFields, { new: true });

      if (!updated) {
        return res.status(404).json({ success: false, message: 'Complaint not found' });
      }

      return res.json({ success: true, message: 'Status updated', data: updated });
    } else {
      const index = inMemoryComplaints.findIndex(
        (c) => c.complaintId.toUpperCase() === param.toUpperCase() || c._id === param
      );

      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Complaint not found' });
      }

      inMemoryComplaints[index].status = status;
      inMemoryComplaints[index].currentStepIndex = currentStepIndex;
      if (assignedTo) inMemoryComplaints[index].assignedTo = assignedTo;
      inMemoryComplaints[index].timeline.push(milestone);
      inMemoryComplaints[index].updatedAt = new Date().toISOString();

      return res.json({
        success: true,
        message: 'Status updated',
        data: inMemoryComplaints[index],
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Upvote complaint ("Me Too" community feature)
// @route   POST /api/complaints/:id/upvote
// @access  Public
export const upvoteComplaint = async (req, res, next) => {
  try {
    const param = req.params.id;
    const voterId = req.body.voterId || req.ip || `anon_${Date.now()}`;

    if (isConnectedToMongo) {
      const query = param.toUpperCase().startsWith('CF-') ? { complaintId: param.toUpperCase() } : { _id: param };
      const complaint = await Complaint.findOne(query);

      if (!complaint) {
        return res.status(404).json({ success: false, message: 'Complaint not found' });
      }

      // Check if already upvoted
      const alreadyVoted = complaint.upvotedBy.includes(voterId);
      if (alreadyVoted) {
        // Toggle remove upvote
        complaint.upvotes = Math.max(0, complaint.upvotes - 1);
        complaint.upvotedBy = complaint.upvotedBy.filter((v) => v !== voterId);
      } else {
        // Add upvote
        complaint.upvotes += 1;
        complaint.upvotedBy.push(voterId);
      }

      await complaint.save();
      return res.json({
        success: true,
        upvotes: complaint.upvotes,
        hasVoted: !alreadyVoted,
      });
    } else {
      const complaint = inMemoryComplaints.find(
        (c) => c.complaintId.toUpperCase() === param.toUpperCase() || c._id === param
      );

      if (!complaint) {
        return res.status(404).json({ success: false, message: 'Complaint not found' });
      }

      const alreadyVoted = complaint.upvotedBy?.includes(voterId);
      if (alreadyVoted) {
        complaint.upvotes = Math.max(0, complaint.upvotes - 1);
        complaint.upvotedBy = complaint.upvotedBy.filter((v) => v !== voterId);
      } else {
        complaint.upvotes = (complaint.upvotes || 0) + 1;
        if (!complaint.upvotedBy) complaint.upvotedBy = [];
        complaint.upvotedBy.push(voterId);
      }

      return res.json({
        success: true,
        upvotes: complaint.upvotes,
        hasVoted: !alreadyVoted,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Verify or Reopen Fix (Verification Loop from user-flow.md)
// @route   POST /api/complaints/:id/verify
// @access  Public / Student
export const verifyOrReopenFix = async (req, res, next) => {
  try {
    const { action, feedback } = req.body; // action: 'approve' | 'reopen'
    const param = req.params.id;

    const isApprove = action === 'approve';
    const newStatus = isApprove ? 'Closed' : 'Reopened';
    const newStepIndex = isApprove ? 4 : 1;

    const milestone = {
      step: newStatus,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      note: isApprove
        ? `Student confirmed resolution: ${feedback || 'Facility working properly'}`
        : `Student disputed fix & reopened ticket: ${feedback || 'Issue persists'}`,
      updatedBy: req.user?.name || 'Student Reporter',
    };

    if (isConnectedToMongo) {
      const query = param.toUpperCase().startsWith('CF-') ? { complaintId: param.toUpperCase() } : { _id: param };
      const updated = await Complaint.findOneAndUpdate(
        query,
        {
          status: newStatus,
          currentStepIndex: newStepIndex,
          verificationStatus: isApprove ? 'Verified' : 'Disputed',
          $push: { timeline: milestone },
        },
        { new: true }
      );

      return res.json({ success: true, data: updated });
    } else {
      const comp = inMemoryComplaints.find(
        (c) => c.complaintId.toUpperCase() === param.toUpperCase() || c._id === param
      );

      if (!comp) return res.status(404).json({ success: false, message: 'Complaint not found' });

      comp.status = newStatus;
      comp.currentStepIndex = newStepIndex;
      comp.verificationStatus = isApprove ? 'Verified' : 'Disputed';
      comp.timeline.push(milestone);

      return res.json({ success: true, data: comp });
    }
  } catch (error) {
    next(error);
  }
};
