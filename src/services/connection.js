import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export function connectMongo() {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log("err", error);
  }
}
