import { app } from "../app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const dbURL = process.env.MONGODB_URL;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function startServer() {
  // await mongoose.connect(dbURL, options);

  await app.listen(PORT).on("error", () => {
    throw new Error("Server crashed");
  });
  console.log(`Server successfully running on http://localhost:${PORT}/`);
}

startServer();
