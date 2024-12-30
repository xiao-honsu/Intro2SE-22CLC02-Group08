const express = require('express');
const router = express.Router();
const chatController = require('../controllers/supportChatController');

router.get('/:userID/:adminID', chatController.getChatMessages);
router.post('/', chatController.sendChatMessage);

module.exports = router;
