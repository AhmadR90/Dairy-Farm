import express from "express";
import { registerUser, loginUser } from "../Controllers/AuthController.js";
import {signupValidation,loginValidation} from "../Middlewares/AuthValidation.js"
const router = express.Router();

router.post("/register",signupValidation, registerUser);
router.post("/login",loginValidation, loginUser);

export default router;
