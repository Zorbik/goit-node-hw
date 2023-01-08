import app from "./src/app.js";
import { connectMongo } from "./src/services/connection.js";
import dotenv from "dotenv";

dotenv.config();

function main() {
  try {
    connectMongo();
    console.log("Database connection successful");
    app.listen(process.env.PORT, (error) => {
      if (error) return console.log(error);
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
}

main();
