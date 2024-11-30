const AdminModel = require('../models/AdminModel');
const path = require('path');
const fs = require('fs');


const adminController = {
    getProfile: async (req, res) => {
        const { adminId } = req.params;

        try {
            const admin = await AdminModel.findOne({ where: { AdminID: adminId } });

            if (!admin) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            return res.status(200).json({ success: true, 
                                          adminId: admin.AdminID,
                                          username: admin.Username,
                                          profileImage: admin.profilePicture,
            });
        } catch (error) {
            console.error("Error during login: ", error);
            return res.status(500).json({ success: false, message: "An error occurred while processing the login" });
        }
    },

  

};

module.exports = adminController;
