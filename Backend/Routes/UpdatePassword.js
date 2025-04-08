import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // Adjust the path based on your project structure

const router = express.Router();

// Update Password Endpoint
router.post("/update-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // 1️⃣ Check if email and new password are provided
    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email and new password are required" });
    }

    // 2️⃣ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
