const express = require("express");
const cors = require("cors");

const authRoutes = require("./routers/authRoutes");
const projectRoutes = require("./routers/projectRoutes");
const taskRouters = require("./routers/taskRouters");
const dashboardRoutes = require("./routers/dashboardRoutes");

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://taskify-fro.netlify.app/signup"
];

app.use(cors({
  origin: function (origin, callback) {

    if (!origin || allowedOrigins.includes(origin)) {

      callback(null, true);

    } else {

      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Taskify Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRouters);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;