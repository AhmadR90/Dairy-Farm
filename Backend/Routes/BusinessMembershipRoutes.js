import express from "express";
import {
  createMembership,
  getAllMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership
} from "../Controllers/BusinessMembershipController.js";

const router = express.Router();

router.post("/create", createMembership);
router.get("/get", getAllMemberships);
router.get("/:id", getMembershipById);
router.put("/:id", updateMembership);
router.delete("/:id", deleteMembership);


export default router;
