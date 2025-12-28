// to build express app and apply middlewares

import dotenv from "dotenv";
dotenv.config(); // Load env vars first

import express from "express";
import cors from "cors";
import route from "./routes/authRoutes.js";

const app = express();

const allowedOrigins = [process.env.CLIENT_URL, process.env.PROD_CLIENT_URL];

// CORS must be before routes
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api/auth", route);

export default app;
