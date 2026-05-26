require("dotenv").config();
const app = require("../app");
const connectDB = require("../config/db");

let dbConnected = false;

async function ensureDb(res) {
  if (dbConnected) return;
  try {
    await connectDB();
    dbConnected = true;
  } catch (err) {
    console.error("❌ Database initialization failed:", err.message || err);
    res.statusCode = 500;
    return res.end("Database connection error");
  }
}

module.exports = async (req, res) => {
  const errorResponse = await ensureDb(res);
  if (errorResponse) return;
  return app(req, res);
};