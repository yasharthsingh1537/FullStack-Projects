import express from "express";
import env from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import taskRoutes from "./routes/task.route.js";
import globalErrorHandler from "./middleware/errorMiddleware.js";

env.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL ?? "*" }));

app.use("/api/tasks", taskRoutes);

app.get("/api/health", (_req, res) => {
  return res.status(200).json({
    message: "Working Perfectly",
  });
});

// catching all the errors
app.use((_req, res) => {
  res.status(400).json({
    success: false,
    message: "Route not found",
  });
});

// connecting the database
connectDB();

// global errors
app.use(globalErrorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
