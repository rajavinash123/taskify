const mongoose = require("mongoose");

// 1. Create Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role:{
    type:String,
    enum:["admin","member"],
    default:"member"
  }
}, {
  timestamps: true
});

// 2. Create Model
const User = mongoose.model("User", userSchema);

// 3. Export Model
module.exports = User;