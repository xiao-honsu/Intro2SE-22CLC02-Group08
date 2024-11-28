const UserModel = require('../models/UserModel');
const path = require('path');
const fs = require('fs');

// Admin mock data
const adminDataPath = path.join(__dirname, '../mockData/admin.json');
const getAdminData = () => {
  const data = fs.readFileSync(adminDataPath, 'utf8');
  return JSON.parse(data);
};

// Controller logic
const authController = {
    // controller về login
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const admins = getAdminData();
            const admin = admins.find(
                (admin) => admin.Email === email && admin.Password === password
            );
            if (admin) 
                return res.status(200).json({ success: true, userType: "admin", id: admin.AdminID });

            const user = UserModel.findOne({
                where: { Email: email, Password: password },
            });
            if (user) 
                return res.status(200).json({ success: true, userType: user.Roles, id: user.UserID });
      
            return res.status(401).json({ success: false, message: "Invalid email or password" });
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

module.exports = authController;
