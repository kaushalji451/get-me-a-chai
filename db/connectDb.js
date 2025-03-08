import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://127.0.0.1:27017/getmeachai";

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {}); 
    console.log(`MongoDB Connected: ${MONGODB_URI}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDb;
