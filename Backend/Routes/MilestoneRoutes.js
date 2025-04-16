import express from "express";
import {
  createMilestone,
  getMilestones,
  getMilestonesByProject,
  updateMilestone,
  deleteMilestone,
} from "../Controllers/milestoneController.js";

const router = express.Router();

router.post("/create", createMilestone);
router.get("/get", getMilestones);

router.put("/:id", updateMilestone);
router.delete("/:id", deleteMilestone);

export default router;
