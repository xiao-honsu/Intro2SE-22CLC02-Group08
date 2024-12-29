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
  
      getChatList: async (req, res) => {
        try {
            const { userID } = req.params;
    
            if (!userID) {
                return res.status(400).json({ success: false, message: "Missing user ID" });
            }
    
            const chatList = await MessageModel.aggregate([
                {
                    $match: {
                        $or: [{ senderID: mongoose.Types.ObjectId(userID) }, { receiverID: mongoose.Types.ObjectId(userID) }]
                    }
                },
                {
                    $sort: { timestamp: -1 } // Sắp xếp theo thời gian gần nhất
                },
                {
                    $group: {
                        _id: {
                            otherUser: {
                                $cond: [
                                    { $eq: ["$senderID", mongoose.Types.ObjectId(userID)] },
                                    "$receiverID",
                                    "$senderID"
                                ]
                            }
                        },
                        lastMessage: { $first: "$content" }, // Lấy tin nhắn cuối cùng
                        timestamp: { $first: "$timestamp" }
                    }
                },
                {
                    $lookup: {
                        from: "users", // Tên collection của người dùng
                        localField: "_id.otherUser",
                        foreignField: "_id",
                        as: "otherUserInfo"
                    }
                },
                {
                    $unwind: "$otherUserInfo"
                },
                {
                    $project: {
                        otherUser: "$otherUserInfo",
                        lastMessage: 1,
                        timestamp: 1
                    }
                },
                { $sort: { timestamp: -1 } }
            ]);
    
            res.status(200).json({ success: true, chatList });
        } catch (error) {
            console.error("Error fetching chat list:", error);
            res.status(500).json({ success: false, message: "Failed to fetch chat list" });
        }
    },
    
};

module.exports = messageController;