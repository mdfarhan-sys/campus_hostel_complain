import Inquiry from '../models/Inquiry.js';
import { isConnectedToMongo } from '../config/db.js';
import { inMemoryInquiries } from '../seed/memoryStore.js';

export const submitInquiry = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message',
      });
    }

    if (isConnectedToMongo) {
      const inquiry = await Inquiry.create({
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
      });

      return res.status(201).json({
        success: true,
        message: 'Message delivered to campus administration desk',
        data: inquiry,
      });
    } else {
      const inquiry = {
        _id: `inq_${Date.now()}`,
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        createdAt: new Date().toISOString(),
      };
      inMemoryInquiries.push(inquiry);

      return res.status(201).json({
        success: true,
        message: 'Message delivered to campus administration desk',
        data: inquiry,
      });
    }
  } catch (error) {
    next(error);
  }
};
