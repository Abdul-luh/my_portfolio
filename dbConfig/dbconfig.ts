import mongoose from "mongoose";

let isConnected = false; // Prevent re-connection

export async function Connect() {
  if (isConnected) {
    return;
  }

  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in environment variables.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "portfolio", // optional if you specify it in the URI
      bufferCommands: false,
    });

    isConnected = true;

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });
  } catch (error) {
    console.error("❌ Initial connection error:", error);
  }
}
