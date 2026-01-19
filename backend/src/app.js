import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import healthRouter from "./routes/health.js";
import initialRouter from "./routes/initial.js";

dotenv.config();

export async function connectDb() {
  if (!process.env.MONGO_URI) return;

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
}

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(express.json());

  app.use("/api/health", healthRouter);
  app.use("/api/initial", initialRouter);

  return app;
}
