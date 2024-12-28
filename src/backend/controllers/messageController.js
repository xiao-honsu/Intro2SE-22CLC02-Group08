const MessageModel = require("../models/MessageModel");

const messageController = {
    sendMessage: async (req, res) => {
        try {
            const { senderID, receiverID, content } = req.body;
    
            if (!senderID || !receiverID || !content) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }
    
            const newMessage = new MessageModel({
                senderID,
                receiverID,
                content,
            });
    
            await newMessage.save();
    
            res.status(201).json({ success: true, message: "Message sent successfully", data: newMessage });
        } catch (error) {
            console.error("Error sending message:", error);
            res.status(500).json({ success: false, message: "Failed to send message" });
        }
    },

    getMessages: async (req, res) => {
        try {
            const { userID, receiverID } = req.params;
    
            if (!userID || !receiverID) {
                return res.status(400).json({ success: false, message: "Missing user or receiver ID" });
            }
    
            const messages = await MessageModel.find({
                $or: [
                    { senderID: userID, receiverID },
                    { senderID: receiverID, receiverID: userID },
                ],
            }).sort({ timestamp: 1 }); 
    
            res.status(200).json({ success: true, messages });
        } catch (error) {
            console.error("Error fetching messages:", error);
            res.status(500).json({ success: false, message: "Failed to fetch messages" });
        }
      },
  

};

module.exports = messageController;