import mongoose from 'mongoose';

export async function connectDatabase() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set');
  }

  await mongoose.connect(MONGODB_URI);
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}
