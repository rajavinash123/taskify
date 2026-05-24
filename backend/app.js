const express = require("express");
const cors = require("cors");
const authRoutes = require("./routers/authRoutes");
const projectRoutes = require("./routers/projectRoutes");
const taskRouters = require("./routers/taskRouters");
const dashboardRoutes = require("./routers/dashboardRoutes");
const app = express();

app.use(express.json());

const allowedOrigins = ["http://localhost:5173", ];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization"
  ]
}));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRouters);
app.use("/api/dashboard", dashboardRoutes);



app.get('/',(req,res)=>{
    res.send("Avinash dont stress you Routes is working")
})

module.exports = app;