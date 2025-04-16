import express from "express";
import {
  createMembership,
  getAllMemberships,
  getMembershipsByProject,
  deleteMembership,
  updateMembershipRole
} from "../Controllers/ProjectMembershipController.js";

const router = express.Router();

// POST - Add a member to a project
router.post("/create", createMembership);

// GET - Get all memberships
router.get("/getAll", getAllMemberships);

// GET - Get all members of a specific project
router.get("/project/:projectId", getMembershipsByProject);

// DELETE - Remove a member from a project
router.delete("/:id", deleteMembership);

// PUT - Update a member's role
router.put("/:id", updateMembershipRole);

export default router;
