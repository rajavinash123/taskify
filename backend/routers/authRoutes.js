const express = require("express");



const { signup, login, getUsers, getProfile } = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = express.Router();
// Auth Routes
router.post("/signup", signup);

router.post("/login", login);

// Protected Route
router.get("/profile", authMiddleware, getProfile);

router.get("/users", authMiddleware, roleMiddleware("admin"), getUsers);

module.exports = router;