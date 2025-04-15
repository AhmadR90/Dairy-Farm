import ChatMessage from "../Models/ChatSchema.js";

// Send a new chat message
export const sendMessage = async (req, res) => {
  try {
    const { businessId, senderId, receiverId, teamId, content, type } = req.body;

    const newMessage = new ChatMessage({
      businessId,
      senderId,
      receiverId,
      teamId,
      content,
      type,
    });

    await newMessage.save();

    res.status(201).json({ message: "Message sent", data: newMessage });
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error: error.message });
  }
};

// Get messages between two users (direct chat)
export const getUserMessages = async (req, res) => {
  try {
    const { user1, user2, businessId } = req.query;

    const messages = await ChatMessage.find({
      businessId,
      type: "one-to-one",
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 }
      ]
    }).sort({ sentAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user messages", error: error.message });
  }
};

// Get messages in a group (team chat)
export const getGroupMessages = async (req, res) => {
  try {
    const { teamId, businessId } = req.query;

    const messages = await ChatMessage.find({
      businessId,
      teamId,
      type: "group"
    }).sort({ sentAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching group messages", error: error.message });
  }
};
