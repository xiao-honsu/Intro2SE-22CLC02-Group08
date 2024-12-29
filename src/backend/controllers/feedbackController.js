const FeedbackModel = require('../models/FeedbackModel');
const NotificationModel = require("../models/NotificationModel");
const mongoose = require('mongoose');

const feedbackController = {
    createFeedback: async (req, res) => {
        try {
            const { sellerID, buyerID, rating, comment, productName } = req.body;

            const feedback  = new FeedbackModel({
                sellerID,
                buyerID,
                rating,
                comment,
            });
            const savedFeedback = await feedback.save();

            const populatedFeedback = await FeedbackModel.findById(savedFeedback._id).populate('buyerID', 'username');
           
            const notificationContent = `Buyer "${populatedFeedback.buyerID.username}" has left feedback for your product "${productName}": "${comment}" (Rating: ${rating}/5).`;
            await NotificationModel.create({
                receiverID: sellerID,
                content: notificationContent,
                role: "seller",
            });

            res.status(201).json({ success: true, message: "Feedback created successfully", feedback});

        } catch (error) {
            console.error("Error creating feedback ", error);
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
    },

    getSellerFeedback: async (req, res) => {
        try {
            const { sellerID } = req.params;
    
            if (!sellerID) {
                return res.status(400).json({ success: false, message: "Seller ID is required." });
            }
    
            const feedbacks = await FeedbackModel.find({ sellerID })
                .populate("buyerID", "username avatar");
    
            if (!feedbacks || feedbacks.length === 0) {
                return res.status(200).json({ success: true, message: "No feedback available.", feedbacks: [] });
            }
    
            res.status(200).json({ success: true, feedbacks });
        } catch (error) {
            console.error("Error fetching feedback:", error);
            res.status(500).json({ success: false, message: "Failed to fetch feedback." });
        }
    },

    getSellerRating: async (req, res) => {
        try {
            const { sellerID } = req.params;
    
            if (!mongoose.isValidObjectId(sellerID)) {
                return res.status(400).json({ success: false, message: "Invalid sellerID format." });
            }
    
            const result = await FeedbackModel.aggregate([
                { $match: { sellerID: new mongoose.Types.ObjectId(sellerID) } }, 
                {
                    $group: {
                        _id: "$sellerID",
                        averageRating: { $avg: "$rating" }, 
                    },
                },
            ]);
    
            const averageRating = result.length > 0 ? parseFloat(result[0].averageRating.toFixed(1)) : 0;
    
            res.status(200).json({ success: true, averageRating, });
        } catch (error) {
            console.error("Error fetching average rating:", error);
            res.status(500).json({ success: false, message: "Failed to fetch average rating." });
        }
    },
    
};

module.exports = feedbackController;