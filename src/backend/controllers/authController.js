const UserModel = require('../models/UserModel');
const AdminModel = require('../models/AdminModel');
const AccessHistoryModel = require('../models/AccessHistoryModel');
const transporter = require("../config/emailConfig");
const jwt = require('jsonwebtoken');
const process = require("process");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const authController = {
    signup: async (req, res) => {
        const { email, password } = req.body;

        try {

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });
            }

            const newUser = new UserModel({
                email: email,
                password: password, 
                username: email.split("@")[0] 
            });

            await newUser.save();

            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                id: newUser._id,
                email: newUser.email,
                username: newUser.username
            });
        } catch (error) {
            console.error("Error during sign up:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while registering the user"
            });
        }
    },


    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const admin = await AdminModel.findOne({ email: email, password: password });
            if (admin) {
                return res.status(200).json({
                    success: true,
                    userType: "admin",
                    id: admin._id,
                    username: admin.username
                });
            }

            const user = await UserModel.findOne({ email: email, password: password });
            if (user) {
                await AccessHistoryModel.create({
                    userID: user._id,
                    status: 'Logged In', 
                });

                return res.status(200).json({
                    success: true,
                    userType: "user",
                    id: user._id, 
                    username: user.username
                });
            }

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        } catch (error) {
            console.error("Error during login:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while processing the login"
            });
        }
    },

    choose_role: async (req, res) => {
        const { id, role } = req.body;

        try {
            const updateUser = await UserModel.findOneAndUpdate(
                { _id: id },          
                { $set: { role: role } }, 
                { new: true }            
            );

            if (updateUser) {
                return res.status(200).json({
                    success: true,
                    message: "Role updated successfully",
                    updatedUser: updateUser
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "User not found or role unchanged"
                });
            }
        } catch (error) {
            console.error("Error during role update:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while updating the role"
            });
        }
    },

    forgotPassword: async (req, res) => {
        const { email } = req.body;
    
        try {
            console.log("Password recovery request for email:", email);
    
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Email not found",
                });
            }
    
            const newPassword = crypto.randomBytes(6).toString("hex"); 
            await UserModel.findByIdAndUpdate(user._id, { password: newPassword });
    
           
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Your New Password",
                html: `
                    <p>Hi ${user.username},</p>
                    <p>Your password has been reset successfully. Here is your new password:</p>
                    <p><strong>${newPassword}</strong></p>
                    <p>Please log in and change your password if necessary.</p>
                `,
            });
    
            console.log("New password sent to:", email);
    
            return res.status(200).json({
                success: true,
                message: "New password has been sent to your email.",
            });
        } catch (error) {
            console.error("Error during forgot password:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while processing your request.",
            });
        }
    },

    updatePassword: async (req, res) => {
        const { email, currentPassword, newPassword } = req.body;
    
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Email not found",
                });
            }
    
            // Kiểm tra mật khẩu hiện tại
            if (user.password !== currentPassword) { // Nếu dùng bcrypt: await bcrypt.compare(currentPassword, user.password)
                return res.status(401).json({
                    success: false,
                    message: "Current password is incorrect",
                });
            }
    
            // Cập nhật mật khẩu mới
            const hashedPassword = newPassword; // Nếu cần hash: await bcrypt.hash(newPassword, 10);
            await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    
            return res.status(200).json({
                success: true,
                message: "Password updated successfully.",
            });
        } catch (error) {
            console.error("Error during password update:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred.",
            });
        }
    },    
    
    
    
};

module.exports = authController;
