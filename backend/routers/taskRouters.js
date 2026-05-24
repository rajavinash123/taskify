const express = require("express");

const {
  createTask,
  getAllTasks,
  getTasks,
  updateTaskStatus
} = require("../Controllers/taskControllers");

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// Create Task (Admin only)
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("admin"),
  createTask
);

// Get all tasks for current user or admin
router.get(
  "/",
  authMiddleware,
  getAllTasks
);

// Get Project Tasks
router.get(
  "/project/:projectId",
  authMiddleware,
  getTasks
);

// Update Task Status
router.patch(
  "/:taskId/status",
  authMiddleware,
  roleMiddleware("member", "admin"),
  updateTaskStatus
);

module.exports = router;