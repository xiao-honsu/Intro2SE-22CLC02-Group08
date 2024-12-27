const ReportModel = require('../models/ReportModel');
const path = require('path');
const fs = require('fs');


const reportController = {
    createReport: async (req, res) => {
        try {
            const { reporterID, reportedID, productID, description } = req.body;
            console.log("Request body:", req.body);

            const report  = new ReportModel({ reporterID, reportedID, productID, description });
            await report.save();

            res.status(201).json({ success: true, message: "Report created successfully", report});

        } catch (error) {
            console.error("Error creating report ", error);
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
    },

    getAllReport: async (req, res) => {
        try {
            const reports = await ReportModel.find()
                .populate('reporterID', 'username email avatar') 
                .populate('reportedID', 'username email avatar') 
                .populate('productID', 'productName price'); 
    
            res.status(200).json({
                success: true,
                message: "Reports fetched successfully",
                reports,
            });
        } catch (error) {
            console.error("Error fetching reports: ", error);
            return res.status(500).json({ success: false, message: "An error occurred" });
        }
    },

};

module.exports = reportController;