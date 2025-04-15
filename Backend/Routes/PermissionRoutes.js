import express from "express";
import {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission
} from "../Controllers/PermissionController.js";

const router = express.Router();

router.post("/create", createPermission);
router.get("/getAll", getAllPermissions);
router.get("/:id", getPermissionById);
router.put("/:id", updatePermission);
router.delete("/:id", deletePermission);

export default router;
