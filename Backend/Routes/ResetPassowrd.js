import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const router = express.Router();

// In-memory OTP store (for simplicity, replace it with a database for production)
let otpStore = {};

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Function to generate a random OTP
const generateOTP = () => {
  const otp = Math.floor(10000 + Math.random() * 90000);
  // console.log(otp); // Generate a 5-digit OTP
  return otp;
};

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Generate OTP
  const otp = generateOTP();

  // Store OTP temporarily (you can use a more persistent store like a database)
  otpStore[email] = otp;

  // Send OTP email using nodemailer
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP for Password Reset",
    text: `Your OTP for password reset is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP" });
  }
});

// POST: Verify OTP (just for demonstration)
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  // Check if OTP exists for the given email
  if (!otpStore[email]) {
    return res.status(400).json({ message: "OTP not generated or expired" });
  }

  // Check if the OTP matches
  if (otpStore[email] === parseInt(otp, 10)) {
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

export default router;
