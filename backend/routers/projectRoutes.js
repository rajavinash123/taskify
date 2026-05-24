const express = require("express");
const { createProject,
  addMember,
  getProjects} =require('../Controllers/projectController')

  const authMiddleware=require('../middlewares/authMiddleware')
    const roleMiddleware=require('../middlewares/roleMiddleware')
    const router = express.Router();

    router.post(
      "/create",
      authMiddleware,
      roleMiddleware("admin"),
      createProject

    );

    router.post(
      "/:projectId/add-member",
      authMiddleware,
      roleMiddleware("admin"),
      addMember
    )

    router.get(
      "/",

      authMiddleware,
      getProjects
    );
    module.exports=router;