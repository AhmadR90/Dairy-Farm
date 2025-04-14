// routes/roleRoutes.js
import express from "express";
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "../Controllers/RoleController.js";

const router = express.Router();

router.post("/create", createRole);
router.get("/getAll", getAllRoles);
router.get("/:id", getRoleById);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

export default router;
