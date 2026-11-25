import { Task } from "../models/Tasks.model.js";

export async function getAllTask(_req, res) {
  const tasks = await Task.find();
  return res.json({ success: true, data: tasks });
}

export async function getOneTask(req, res) {
  const task = await Task.findById(req.params.id);
  if (!task) {
    const err = new Error("Task not found");
    err.statusCode = 404;
    throw err;
  }
  return res.json({ success: true, data: task });
}

export async function createTask(req, res) {
  const task = await Task.create(req.body);
  return res.status(201).json({ success: true, data: task });
}

export async function updateTask(req, res) {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    const err = new Error("Task not found");
    err.statusCode = 404;
    throw err;
  }
  return res.json({ success: true, data: task });
}

export async function deleteTask(req, res) {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    const err = new Error("Task not found");
    err.statusCode = 404;
    throw err;
  }
  return res.json({ success: true, data: {} });
}
