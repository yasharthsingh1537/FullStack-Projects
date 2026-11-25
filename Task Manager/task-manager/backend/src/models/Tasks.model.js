import mongoose from "mongoose";

const ALLOWED_STATUSES = ["pending", "in-progress", "completed"];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [1, "Task title cannot be empty"],
      maxlength: [120, "Task title must be 120 characters or fewer"],
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      minlength: [1, "Task description cannot be empty"],
      maxlength: [500, "Task title must be 500 characters or fewer"],
    },
    status: {
      type: String,
      enum: {
        values: ALLOWED_STATUSES,
        message: `Status must be one of: ${ALLOWED_STATUSES.join(", ")}`,
      },
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Task = mongoose.model("Task", taskSchema);
