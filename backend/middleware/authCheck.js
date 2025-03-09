const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

async function authCheck(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        error: true,
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    console.log(decoded);

    if (!decoded) {
      return res.status(401).json({
        error: true,
        success: false,
        message: "Unauthorized - Invalid token",
      });
    }

    const user = await userModel.findById(decoded._id).select("-password");
    // console.log(user);

    if (!user) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log("Error in authCheck: ", err.message);
    res.status(500).json({
      error: true,
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = authCheck;
