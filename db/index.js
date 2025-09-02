import mongoose from "mongoose";
import { logger } from "../logger.js";

import dotenv from "dotenv";
dotenv.config({ silent: true });

export async function connectDB() {
  try {
    const MONGO_URI = process.env.DATABASE_URL;
    if (!MONGO_URI) throw new Error("Database connection string is missing");
    await mongoose.connect(MONGO_URI);
    logger.info("Database connected successfully");
  } catch (err) {
    logger.error("Error connecting to the database");
    console.log(err);
    process.exit(1);
  }
}
