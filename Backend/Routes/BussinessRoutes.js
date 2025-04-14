// routes/businessRoutes.js

import express from "express";
import {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
} from "../Controllers/BussinessController.js";

const router = express.Router();

router.post("/createBusiness", createBusiness);
router.get("/getAllBusiness", getAllBusinesses);
router.get("/:id", getBusinessById);
router.put("/:id", updateBusiness);
router.delete("/:id", deleteBusiness);

export default router;
