const Task = require("../models/Task");

const getDashboardStats = async (req, res) => {

  try {

    // Total Tasks
    const totalTasks = await Task.countDocuments();

    // Completed Tasks
    const completedTasks = await Task.countDocuments({
      status: "completed"
    });

    // Pending Tasks
    const pendingTasks = await Task.countDocuments({
      status: "pending"
    });

    // Overdue Tasks
    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "completed" }
    });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  getDashboardStats
};