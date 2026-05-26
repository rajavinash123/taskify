require("dotenv").config();
const mongoose=require('mongoose')
const app=require('../app')
const connectDB=require('../config/db')
connectDB()
module.exports=app;