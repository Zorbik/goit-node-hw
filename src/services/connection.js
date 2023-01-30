import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectMongo() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log("error", error);
  }
}
