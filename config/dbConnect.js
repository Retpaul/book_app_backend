import mongoose from "mongoose";
import { isDev } from "../utils/helpers.js";

const mongoUri = isDev ? process.env.MONGODBCOMPASS : process.env.MONGODBATLAS;

export default async function connectDb() {
  try {
    const connect = await mongoose.connect(mongoUri);
    if (!connect) {
      throw new Error("Failed to connect to database");
    }
    console.log("Database successfully connected");
  } catch (error) {
    console.error('Connection error', error);

  }
}
