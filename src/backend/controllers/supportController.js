const SupportModel = require("../models/SupportModel");
const AdminModel = require("../models/AdminModel");

const supportController = {
    sendMessage: async (req, res) => {
        try {
            const { senderID, message } = req.body;

           
            console.log("Fetching admin list...");
            const admins = await AdminModel.find();
            console.log("Admins found:", admins);

            if (admins.length === 0) {
                return res.status(404).json({ success: false, message: "No admin available" });
            }

            const randomAdmin = admins[Math.floor(Math.random() * admins.length)];
            console.log("Selected admin:", randomAdmin);

           
            const newMessage = new SupportModel({
                senderID,
                receiverID: randomAdmin._id,
                message,
            });

            const savedMessage = await newMessage.save();
            console.log("Saved message:", savedMessage);

            return res.status(201).json({ success: true, message: savedMessage });
        } catch (error) {
            console.error("Error sending support message:", error);
            res.status(500).json({ success: false, message: "Failed to send message" });
        }
    },

   
    getMessages: async (req, res) => {
        try {
            const { userId } = req.params;

            const messages = await SupportModel.find({
                senderID: userId,
            })
                .populate("receiverID", "username")
                .sort({ timestamp: 1 });

            res.status(200).json({ success: true, messages: messages || [] });
        } catch (error) {
            console.error("Error fetching support messages:", error);
            res.status(500).json({ success: false, message: "Failed to fetch messages" });
        }
    },
};

module.exports = supportController;
