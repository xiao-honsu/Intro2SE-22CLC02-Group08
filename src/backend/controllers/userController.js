const UserModel = require('../models/UserModel');

const userController = {
    getProfile: async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await UserModel.findOne({ UserID: userId });

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            return res.status(200).json({
                success: true,
                userId: user.UserID,
                username: user.username,
                profileImage: user.avatar,
                signupDate: user.registrationDate,
            });
        } catch (error) {
            console.error("Error fetching user profile: ", error);
            return res.status(500).json({ success: false, message: "An error occurred while fetching the profile" });
        }
    },

    choose_role: async (req, res) => {
        const { id, role } = req.body;

        try {
            const updateUser = await UserModel.findOneAndUpdate(
                { UserID: id },
                { $set: { role } },
                { new: true }
            );

            if (updateUser) {
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
