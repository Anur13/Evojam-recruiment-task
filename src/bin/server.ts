import { app } from "../app";
import mongoose from "mongoose";
import envVars from "./config";

const port = envVars.PORT || 3000;

async function startServer() {
  try {
    await mongoose.connect(envVars.MONGODB_URL);
  } catch (e) {
    console.log(e);
  }

  await app.listen(port).on("error", () => {
    throw new Error("Server crashed");
  });
  console.log(`Server successfully running on http://localhost:${port}/`);
}

startServer();
