const MessageModel = require("../models/MessageModel");
const UserModel = require("../models/UserModel");
const NotificationModel = require("../models/NotificationModel");

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
            
            const lastMessage = await MessageModel.findOne({
                senderID: receiverID,
                receiverID: senderID,
            }).sort({ timestamp: -1 });

            const currentTime = new Date();

            if (!lastMessage || (currentTime - new Date(lastMessage.timestamp)) / (1000 * 60) > 15 ) {
                const senderUser = await UserModel.findById(senderID).select("username");
                const notificationContent = `${senderUser.username} has sent you a message.`;

                await NotificationModel.create({
                    receiverID,
                    content: notificationContent,
                    role: senderUser.role, 
                });
            }

            const savedMessage = await newMessage.save();    
            res.status(201).json({ success: true, message: savedMessage });
        } catch (error) {
            console.error("Error sending message:", error);
            res.status(500).json({ success: false, message: "Failed to send message." });
        }
    },
};

module.exports = messageController;
