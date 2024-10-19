import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_DOCKER_PORT}/${process.env.MONGODB_NAME}?authSource=admin`;
    const conn = await mongoose.connect(mongoURI as string, { 
      autoCreate: true
     });
    console.log(`MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}

export default connectDB;
