import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Complaint from '../models/Complaint.js';
import { inMemoryUsers, inMemoryComplaints } from './memoryStore.js';

dotenv.config();

const seedDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campusfix';
    await mongoose.connect(uri);
    console.log('MongoDB connected for seeding...');

    // Clear existing
    await User.deleteMany({});
    await Complaint.deleteMany({});

    // Clean ids for mongoose
    const usersToInsert = inMemoryUsers.map(({ _id, ...u }) => u);
    const complaintsToInsert = inMemoryComplaints.map(({ _id, ...c }) => c);

    await User.insertMany(usersToInsert);
    await Complaint.insertMany(complaintsToInsert);

    console.log('\x1b[32m✔ Database successfully seeded with demo users and complaints!\x1b[0m');
    process.exit(0);
  } catch (error) {
    console.error('\x1b[31mSeed error:\x1b[0m', error.message);
    process.exit(1);
  }
};

seedDB();
