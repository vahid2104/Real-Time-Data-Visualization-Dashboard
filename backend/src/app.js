import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import healthRouter from "./routes/health.js";
import initialRouter from "./routes/initial.js";
import authRouter from "./routes/auth.js";

dotenv.config();

export async function connectDb() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
}

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    })
  );

  app.use(express.json());

  app.use("/api/health", healthRouter);
  app.use("/api/initial", initialRouter);
  app.use("/api/auth", authRouter);

  return app;
}
