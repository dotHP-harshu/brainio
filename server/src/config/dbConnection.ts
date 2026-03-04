import mongoose from "mongoose";
import config from "./config";

// Track the connection state
let isConnected = false;

export default async function dbConnection() {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(config.MONGOOSE_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("New database connection established");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}
