const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// SIGNUP
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id, "name email role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found in database"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { signup, login, getUsers, getProfile };