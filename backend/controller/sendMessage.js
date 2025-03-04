const conversationModel = require("../models/conversationModel");
const messageModel = require("../models/messageModel");

async function sendMessageController(req, res) {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    await Promise.all([conversation.save(), newMessage.save()]); // Better way to save

    res.status(201).json({
      success: true,
      error: false,
      message: newMessage,
    });
  } catch (err) {
    console.log("Error in sendMessageController: ", err.message);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = sendMessageController;
