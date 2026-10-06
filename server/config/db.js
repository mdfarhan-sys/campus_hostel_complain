import mongoose from 'mongoose';

export let isConnectedToMongo = false;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campusfix';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick check so server doesn't hang if local mongod is absent
    });

    isConnectedToMongo = true;
    console.log(`\x1b[32m✔ MongoDB Connected: ${conn.connection.host} (${conn.connection.name})\x1b[0m`);
    return true;
  } catch (error) {
    isConnectedToMongo = false;
    console.warn(`\x1b[33m⚠ MongoDB is not running locally (${error.message}).\x1b[0m`);
    console.warn(`\x1b[36mℹ CampusFix is operating in Resilient Local Store mode. All API endpoints remain fully functional!\x1b[0m`);
    console.warn(`\x1b[90m  (To use MongoDB, provide your Atlas URI in server/.env under MONGO_URI)\x1b[0m`);
    return false;
  }
};
