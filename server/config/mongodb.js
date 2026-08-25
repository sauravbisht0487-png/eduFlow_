
import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database Connected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Database connection error:", err.message);
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/lms`, {
    family: 4,
    serverSelectionTimeoutMS: 30000,
  });
};

export default connectDB;