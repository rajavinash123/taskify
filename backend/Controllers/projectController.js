const Project = require("../models/Project");
const User = require("../models/User");

// Create Project
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Project created successfully",
      project
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// Add Member
const addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    project.members.push(userId);

    await project.save();

    res.json({
      message: "Member added successfully",
      project
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// View Projects
const getProjects = async (req, res) => {
  try {

    const projects = await Project.find({
      $or: [
        { createdBy: req.user.id },
        { members: req.user.id }
      ]
    }).populate("members", "name email");

    res.json(projects);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  createProject,
  addMember,
  getProjects
};
