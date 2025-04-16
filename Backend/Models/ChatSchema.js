// models/ChatMessage.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
 

  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  }, // I add this For restrictions
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //This is Null for group chat
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" }, // This is Null for direct chat
  content: { type: String, required: true },
  type: { type: String, enum: ["one-to-one", "group"], required: true },
  sentAt: { type: Date, default: Date.now },
});

// // Validating that either receiver_id or team_id is provided, but not both
chatMessageSchema.pre("validate", function (next) {
  if (
    (this.receiverId && this.teamId) ||
    (!this.receiverId && !this.teamId)
  ) {
    next(
      new Error("Either receiver_id or team_id must be provided, but not both")
    );
  } else {
    next();
  }
});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
export default ChatMessage;
