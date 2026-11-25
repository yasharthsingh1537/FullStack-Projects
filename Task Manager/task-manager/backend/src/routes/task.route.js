import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getOneTask,
  updateTask,
} from "../controllers/task.controller.js";
import { validateCreateTask, validateUpdateTask } from "../models/validateTask.js";

const taskRoutes = Router();

taskRoutes
  .get("/all-tasks", getAllTask)
  .get("/task/:id", getOneTask)
  .post("/create-task", validateCreateTask, createTask)
  .put("/update-task/:id", validateUpdateTask, updateTask)
  .delete("/delete-task/:id", deleteTask);

export default taskRoutes;
