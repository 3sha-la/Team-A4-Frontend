import mongoose from 'mongoose';

export async function connectDatabase() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    console.warn('MONGODB_URI is not set. Starting without a database connection.');
    return false;
  }

  await mongoose.connect(MONGODB_URI);
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
  return true;
}