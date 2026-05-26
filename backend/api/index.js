require("dotenv").config();
const serverless = require("serverless-http");
const app = require("../app");
const connectDB = require("../config/db");

connectDB();

module.exports = serverless(app);