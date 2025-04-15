const express = require("express");
const router = express.Router();
const {
  createTeamMembership,
  getAllTeamMemberships,
  getTeamMembershipById,
  updateTeamMembership,
  deleteTeamMembership
} = require("../Controllers/TeamMembershipController.js");

router.post("/create", createTeamMembership);
router.get("/getAll", getAllTeamMemberships);
router.get("/:id", getTeamMembershipById);
router.put("/:id", updateTeamMembership);
router.delete("/:id", deleteTeamMembership);

module.exports = router;
