import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectMongo() {
  try {
    await mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log("error", error);
  }
}
