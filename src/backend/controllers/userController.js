const UserModel = require('../models/UserModel');
const FeedbackModel = require('../models/FeedbackModel');
const mongoose = require('mongoose');

const userController = {
    getProfile: async (req, res) => {
        const { userId } = req.params; 
        
        try {
            const user = await UserModel.findById(userId);
    
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            
            let averageRating = 0;
            if (user.role === "seller") {
                const result = await FeedbackModel.aggregate([
                    { $match: { sellerID: user._id } }, 
                    {
                        $group: {
                            _id: "$sellerID",
                            averageRating: { $avg: "$rating" },
                        },
                    },
                ]);
                averageRating = result.length > 0 ? parseFloat(result[0].averageRating.toFixed(1)) : 0;
            }

            return res.status(200).json({
                success: true,
                userId: user._id,
                username: user.username,
                avatar: user.avatar || "", 
                role: user.role,
                signupDate: user.registrationDate,
                numItems: user.totalSoldProducts || 0,
                rating: averageRating || "0",
                bank: user.bank || "",
                backAccount: user.bankAccount || "",
            });
        } catch (error) {
            console.error("Error fetching user profile: ", error);
            return res.status(500).json({ success: false, message: "An error occurred while fetching the profile" });
        }
    },

    updateProfile: async (req, res) => {
        const { userId } = req.params;
        const { avatar, username, bank, bankAccount } = req.body;

        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            user.avatar = avatar || user.avatar;
            user.username = username || user.username;
            user.bank = bank || user.bank;
            user.bankAccount = bankAccount || user.bankAccount;

            await user.save(); 

            return res.status(200).json({ success: true, updatedUser: user });
        } catch (error) {
            console.error("Error updating profile:", error);
            return res.status(500).json({ success: false, message: "Failed to update profile" });
        }
    },

    choose_role: async (req, res) => {
        const { id, role } = req.body;

        try {
            const updateUser = await UserModel.findByIdAndUpdate(
                id,
                { $set: { role: role } }, 
                { new: true }
            );

            if (updateUser) {
                return res.status(200).json({ success: true, message: "Role updated successfully", role: updateUser.role });
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
