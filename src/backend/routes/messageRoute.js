const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");


router.post("/", messageController.sendMessage);
router.get("/:userID/:receiverID", messageController.getMessages);
router.get("/chat-list/:userID", messageController.getChatList);
module.exports = router;
