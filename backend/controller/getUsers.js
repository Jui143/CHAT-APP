const userModel = require("../models/userModel");

async function getUsersController(req, res) {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await userModel.findOne({
      _id: { $ne: loggedInUserId },
    });

    res.status(200).json({
      success: true,
      error: false,
      message: filteredUsers,
    });
  } catch (err) {
    console.log("Error in getUsersController: ", err.message);

    res.status(500).json({
      error: true,
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = getUsersController;
