const AccessHistoryModel = require('../models/AccessHistoryModel');
const StatisticsModel = require('../models/StatisticsModel');

const accessHistoryController = {
    addHistory: async (req, res) => {
        const { userID, status } = req.body;

        if (!userID || !status) {
            return res.status(400).json({ success: false, message: "userID and status are required" });
        }
        
        try {
            const newHistory = new AccessHistoryModel({
                userID,
                status,
            });
    
            await newHistory.save();

            if (status === 'Logged Out') {
                await StatisticsModel.findOneAndUpdate(
                    {},
                    { $inc: { currentVisitors: -1 } },
                    { sort: { date: -1 } } 
                );
            }

            res.status(201).json({ success: true, message: "Access history added successfully" });
        } catch (error) {
            console.error("Error adding access history:", error);
            res.status(500).json({ success: false, message: "Failed to add access history" });
        }
    },

  

};

module.exports = accessHistoryController;