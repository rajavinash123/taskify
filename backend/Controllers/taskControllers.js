const Task=require('../models/Task')
// Create Task
const createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      assignedTo,
      projectId,
      dueDate
    } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      projectId,
      dueDate,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// Get all tasks for a user or admin
const getAllTasks = async (req, res) => {
  try {
    const query = req.user.role === "admin" ? {} : { assignedTo: req.user.id };

    const tasks = await Task.find(query)
      .populate("assignedTo", "name email")
      .populate("projectId", "name");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// Get Tasks by Project
const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      projectId: req.params.projectId
    })
      .populate("assignedTo", "name email")
      .populate("projectId", "name");

    res.json(tasks);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// Update Task Status
const updateTaskStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    task.status = status;

    await task.save();

    res.json({
      message: "Task status updated",
      task
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTasks,
  updateTaskStatus
};