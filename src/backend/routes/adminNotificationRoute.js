const express = require("express");
const router = express.Router();
const adminNotificationController = require("../controllers/adminNotificationController");


router.get("/:receiverID", adminNotificationController.getNotifications);
router.patch("/:notificationID/read", adminNotificationController.markAsRead);
module.exports = router;
