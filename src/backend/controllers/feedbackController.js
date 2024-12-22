const FeedbackModel = require('../models/FeedbackModel');
const path = require('path');
const fs = require('fs');


const feedbackController = {
    createFeedback: async (req, res) => {
        try {
            const { sellerID, buyerID, rating, comment } = req.body;
            console.log("Request body:", req.body);

            const feedback  = new FeedbackModel({
                sellerID,
                buyerID,
                rating,
                comment
            });
            await feedback.save();

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
                console.log("Seller ID not provided in request.");
                return res.status(400).json({ success: false, message: "Seller ID is required." });
            }
    
            const feedbacks = await FeedbackModel.find({ sellerID })
                .populate("buyerID", "username avatar");
    
            if (!feedbacks || feedbacks.length === 0) {
                console.log("No feedback found for sellerID:", sellerID);
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
            const feedbacks = await FeedbackModel.find({ sellerID });
            const averageRating = feedbacks.length ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
                                                    : 0;
            res.status(200).json({
                success: true, averageRating
            });                                       
        } catch (error) {
            console.error("Error fetching feedback:", error);
            res.status(500).json({ success: false, message: "Failed to fetch feedback." });
        }
    }

};

module.exports = feedbackController;