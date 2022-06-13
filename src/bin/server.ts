import { app } from "../app";
import mongoose from "mongoose";
import envVars from "./config";

async function startServer() {
  try {
    await mongoose.connect(envVars.MONGODB_URL);
  } catch (e) {
    console.log();
    console.log(e);
  }

  await app.listen(envVars.PORT).on("error", () => {
    throw new Error("Server crashed");
  });
  console.log(`Server successfully running on http://localhost:${envVars.PORT}/`);
}

startServer();
