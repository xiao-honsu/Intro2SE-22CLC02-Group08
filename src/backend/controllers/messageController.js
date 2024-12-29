const MessageModel = require("../models/MessageModel");
const UserModel = require("../models/UserModel");

const messageController = {
    getMessagesWithUser: async (req, res) => {
        try {
            const { userId, otherUserId } = req.params;
    
            const messages = await MessageModel.find({
                $or: [
                    { senderID: userId, receiverID: otherUserId },
                    { senderID: otherUserId, receiverID: userId }
                ]
            }).sort({ timestamp: 1 });
            
            res.status(200).json({ success: true, messages: messages || [] });
        } catch (error) {
            console.error("Error fetching messages:", error);
            res.status(500).json({ success: false, message: "Failed to fetch messages." });
        }
    },
    
    sendMessage: async (req, res) => {
        try {
            const { senderID, receiverID, content } = req.body;
            
            const newMessage = new MessageModel({
                senderID,
                receiverID,
                content
            });
    
            const savedMessage = await newMessage.save();
            console.log(savedMessage);
    
            res.status(201).json({ success: true, message: savedMessage });
        } catch (error) {
            console.error("Error sending message:", error);
            res.status(500).json({ success: false, message: "Failed to send message." });
        }
    },
};

module.exports = messageController;
