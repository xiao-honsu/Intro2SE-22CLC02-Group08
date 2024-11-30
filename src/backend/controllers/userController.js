const UserModel = require('../models/UserModel');
const path = require('path');
const fs = require('fs');

const userController = {
    getProfile: async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await UserModel.findOne({ where: { UserID: userId } });

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            return res.status(200).json({ success: true, 
                                          userId: user.UserID,
                                          username: user.Username,
                                          profileImage: user.profilePicture,
                                          signupDate: user.RegistrationDate,
            });
        } catch (error) {
            console.error("Error during login: ", error);
            return res.status(500).json({ success: false, message: "An error occurred while processing the login" });
        }
    },

    choose_role: async (req, res) => {
        const { id, role } = req.body;

        try {
            const updateUser = await UserModel.update({ Roles: role }, { where: { UserID: id } });
    
            if (updateUser[0] > 0) {
                return res.status(200).json({ success: true, message: "Role updated successfully" });
            } else {
                return res.status(404).json({ success: false, message: "User not found or role unchanged" });
            }
        } catch (error) {
            console.error("Error during role update:", error);
            return res.status(500).json({ success: false, message: "An error occurred while updating the role" });
        }
    },

   


};

module.exports = userController;
