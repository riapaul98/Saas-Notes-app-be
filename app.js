// to build express app and apply middlewares

import express from "express";
import cors from "cors";
import route from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", route);

export default app;
