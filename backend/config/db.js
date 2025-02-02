import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    process.exit(0);
  } catch (error) {
    console.error("Unable to establish connection with MongoDB cluster");
    process.exit(1); // 1 means error, 0 means success
  }
};
