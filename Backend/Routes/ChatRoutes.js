import express from "express";
import {
  sendMessage,
  getUserMessages,
  getGroupMessages,
} from "../Controllers/ChatController.js";

const router = express.Router();

// POST - Send a message
router.post("/send", sendMessage);

// GET - Direct messages between two users
router.get("/direct", getUserMessages);

// GET - Group chat messages
router.get("/group", getGroupMessages);

export default router;
