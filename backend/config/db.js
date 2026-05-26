const mongoose = require("mongoose");

const connectDB = async () => {
const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGO_URI is not defined in .env");
   
  }

  try {
    await mongoose.connect(uri, {
     
    });

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    
  }
};

module.exports = connectDB;