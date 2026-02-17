import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("DB Connected Successfully 🚀");
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    process.exit(1);
  }
};
