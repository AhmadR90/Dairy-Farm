// models/ChatMessage.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
  sender_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  message_content: {
    type: String,
    required: true
  },
  sent_at: {
    type: Date,
    default: Date.now
  }
});

// Validating that either receiver_id or team_id is provided, but not both
chatMessageSchema.pre('validate', function(next) {
  if ((this.receiver_id && this.team_id) || (!this.receiver_id && !this.team_id)) {
    next(new Error('Either receiver_id or team_id must be provided, but not both'));
  } else {
    next();
  }
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
module.exports = ChatMessage;