const SupportModel = require("../models/SupportModel");
const AdminModel = require("../models/AdminModel");
const mongoose = require("mongoose");

const supportController = {
    findAdminForUser: async (req, res) => {
        try {
            const { userID } = req.body;
    
            if (!mongoose.Types.ObjectId.isValid(userID)) {
                return res.status(400).json({ success: false, message: "Invalid userID" });
            }
    
            let existingMessage = await SupportModel.findOne({ senderID: userID }).sort({ timestamp: -1 });
    
            let adminID;
            if (!existingMessage) {
                const admins = await AdminModel.find();
                if (admins.length === 0) {
                    return res.status(404).json({ success: false, message: "No admin available" });
                }
    
                const randomAdmin = admins[Math.floor(Math.random() * admins.length)];
                adminID = randomAdmin._id;
            } else {
                adminID = existingMessage.receiverID;
            }
    
            return res.status(200).json({ success: true, adminID });
        } catch (error) {
            console.error("Error finding admin for user:", error.message);
            res.status(500).json({ success: false, message: "Failed to find admin." });
        }
    },
    
};

module.exports = supportController;
