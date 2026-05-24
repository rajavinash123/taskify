const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware=require("../middlewares/roleMiddleware")
const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
     message: "Project created by admin"
    });
  }
);

router.get('/tasks',authMiddleware,roleMiddleware("admin","member"),(req,res)=>{
    res.json({ message: "Tasks accessible by all users" });
})



module.exports = router;