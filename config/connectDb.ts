import mongoose from 'mongoose';

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MongoDB URI not provided');
  }
  const mongoURI = process.env.MONGO_URI;
  const con: typeof mongoose = await mongoose.connect(mongoURI);
  if (!con) {
    throw new Error('MongoDB connection failed');
  }
  console.log(`MongoDB Connected: ${con.connection.host}`);
};

export default connectDB;
