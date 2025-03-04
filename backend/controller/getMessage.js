const conversationModel = require("../models/conversationModel");

async function getMessageController(req, res) {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await conversationModel
      .findOne({
        participants: { $all: [senderId, userToChatId] },
      })
      .populate("messages");

    res.status(200).json({
      success: true,
      error: false,
      message: conversation.messages,
    });
  } catch (err) {
    console.log("Error in getMessageController: ", err.message);

    res.status(500).json({
      error: true,
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = getMessageController;
