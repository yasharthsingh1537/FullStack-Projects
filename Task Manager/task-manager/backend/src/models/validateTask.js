const ALLOWED_STATUSES = ["pending", "in-progress", "completed"];

export function validateCreateTask(req, _res, next) {
  const { title, description, status } = req.body ?? {};

  if (typeof title !== "string" || title.trim().length === 0) {
    const err = new Error("Task title is required");
    err.statusCode = 400;
    throw err;
  }

  if (!description || typeof description !== "string" || description.trim().length === 0) {
    const err = new Error("Task body is required");
    err.statusCode = 400;
    throw err;
  }

  if (status !== undefined && !ALLOWED_STATUSES.includes(status)) {
    const err = new Error(
      `Invalid status "${status}". Allowed values: ${ALLOWED_STATUSES.join(", ")}`,
    );
    err.statusCode = 400;
    throw err;
  }

  req.body.title = req.body.title.trim();
  next();
}

export function validateUpdateTask(req, _res, next) {
  const { title, description, status } = req.body ?? {};

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length === 0) {
      const err = new Error("Task title cannot be empty");
      err.statusCode = 400;
      throw err;
    }
    req.body.title = title.trim();
  }

  if (description !== undefined) {
    if (typeof description !== "string" || description.trim().length === 0) {
      const err = new Error("Task description cannot be empty");
      err.statusCode = 400;
      throw err;
    }
    req.body.description = description.trim();
  }

  if (status !== undefined && !ALLOWED_STATUSES.includes(status)) {
    const err = new Error(
      `Invalid status "${status}". Allowed values: ${ALLOWED_STATUSES.join(", ")}`,
    );
    err.statusCode = 400;
    throw err;
  }

  next();
}
