import Complaint from '../models/Complaint.js';
import { isConnectedToMongo } from '../config/db.js';
import { inMemoryComplaints } from '../seed/memoryStore.js';

export const getStats = async (req, res, next) => {
  try {
    if (isConnectedToMongo) {
      const totalReported = await Complaint.countDocuments();
      const totalResolved = await Complaint.countDocuments({ status: { $in: ['Resolved', 'Closed'] } });
      const inProgress = await Complaint.countDocuments({ status: 'In Progress' });
      const underReview = await Complaint.countDocuments({ status: 'Under Review' });

      return res.json({
        success: true,
        data: {
          activeStudents: '1,200+',
          issuesReported: 2800 + totalReported,
          issuesResolved: 2500 + totalResolved,
          inProgress,
          underReview,
          avgResolutionTime: '24–48 hrs',
        },
      });
    } else {
      const total = inMemoryComplaints.length;
      const resolved = inMemoryComplaints.filter((c) => ['Resolved', 'Closed'].includes(c.status)).length;
      const inProgress = inMemoryComplaints.filter((c) => c.status === 'In Progress').length;
      const underReview = inMemoryComplaints.filter((c) => c.status === 'Under Review').length;

      return res.json({
        success: true,
        data: {
          activeStudents: '1,200+',
          issuesReported: 2800 + total,
          issuesResolved: 2500 + resolved,
          inProgress,
          underReview,
          avgResolutionTime: '24–48 hrs',
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
