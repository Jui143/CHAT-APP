const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/userSignUp");
const userLogInController = require("../controller/userLogin");
const userLogoutController = require("../controller/userLogout");
const sendMessageController = require("../controller/sendMessage");
const authCheck = require("../middleware/authCheck");
const getMessageController = require("../controller/getMessage");

router.post("/signup", userSignUpController);
router.post("/login", userLogInController);
router.get("/userLogout", userLogoutController);

router.get("/messages/:id", authCheck, getMessageController);
router.post("/messages/send/:id", authCheck, sendMessageController);

module.exports = router;
