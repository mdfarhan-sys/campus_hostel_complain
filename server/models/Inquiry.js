import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      lowercase: true,
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject line'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please enter your message'],
    },
    status: {
      type: String,
      enum: ['New', 'Reviewed', 'Archived'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
