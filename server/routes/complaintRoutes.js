import express from 'express';
import {
  createComplaint,
  getComplaints,
  getComplaintByIdOrTrackingId,
  updateComplaintStatus,
  upvoteComplaint,
  verifyOrReopenFix,
} from '../controllers/complaintController.js';
import { protect, optionalAuth, authorize } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getComplaints)
  .post(optionalAuth, upload.single('image'), createComplaint);

router.route('/:id')
  .get(getComplaintByIdOrTrackingId);

router.route('/:id/status')
  .patch(protect, authorize('warden', 'admin', 'technician'), updateComplaintStatus);

router.route('/:id/upvote')
  .post(upvoteComplaint);

router.route('/:id/verify')
  .post(optionalAuth, verifyOrReopenFix);

export default router;
