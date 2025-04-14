import express from "express";
import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} from "../Controllers/TeamController.js";
import { protect } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/create", createTeam);
router.get("/getall",  getAllTeams);
router.get("/:id",  getTeamById);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
