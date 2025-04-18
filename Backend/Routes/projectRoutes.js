// routes/projectRoutes.js
import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../Controllers/ProjectController.js";

const router = express.Router();

router.post("/create", createProject);
router.get("/getAll", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
