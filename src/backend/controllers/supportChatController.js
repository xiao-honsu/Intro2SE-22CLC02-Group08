const SupportModel = require("../models/SupportModel");
const GiveSupportModel = require('../models/GiveSupportModel');
const AdminNotificationModel = require("../models/AdminNotificationModel");
const UserModel = require("../models/UserModel");
const mongoose = require("mongoose");

const chatController = {
    getChatMessages: async (req, res) => {
        try {
            const { userID, adminID } = req.params;

            const supportMessages = await SupportModel.find({
                senderID: userID,
                receiverID: adminID,
            });

            const giveSupportMessages = await GiveSupportModel.find({
                senderID: adminID,
                receiverID: userID,
            });

            const allMessages = [...supportMessages, ...giveSupportMessages].sort(
                (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            );
            
            res.status(200).json({ success: true, messages: allMessages });
        } catch (error) {
            console.error("Error fetching chat messages:", error);
            res.status(500).json({ success: false, message: "Failed to fetch messages" });
        }
    },

    sendChatMessage: async (req, res) => {
        try {
            const { senderID, receiverID, message, role } = req.body;

            let newMessage;
            const currentTime = new Date();
            if (role === "user") {
                const user = await UserModel.findById(senderID).select("username");
                
                const existingMessage = await SupportModel.findOne({ senderID: new mongoose.Types.ObjectId(senderID) })
                                .sort({ timestamp: -1 });
                
                if (!existingMessage) {
                    await AdminNotificationModel.create({
                        receiverID: receiverID,
                        content: `User "${user.username}" has started a support conversation.`,
                        role: "admin",
                    });
                }
                if (existingMessage && new Date(existingMessage.timestamp)) {
                    const timeDiff = (currentTime - new Date(existingMessage.timestamp)) / (1000 * 60); 
                    if (timeDiff > 30) {
                        await AdminNotificationModel.create({
                            receiverID: receiverID,
                            content: `User "${user.username}" has sent a support message after 30 minutes.`,
                            role: "admin",
                        });
                    }
                }
                newMessage = new SupportModel({
                    senderID,
                    receiverID,
                    message,
                });

            } else if (role === "admin") {
                newMessage = new GiveSupportModel({
                    senderID,
                    receiverID,
                    message,
                });
            } else {
                return res.status(400).json({ success: false, message: "Invalid role" });
            }

            const savedMessage = await newMessage.save();
            res.status(201).json({ success: true, message: savedMessage });
        } catch (error) {
            console.error("Error sending chat message:", error);
            res.status(500).json({ success: false, message: "Failed to send message" });
        }
    },

};

module.exports = chatController;