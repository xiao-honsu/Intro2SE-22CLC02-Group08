const AdminModel = require('../models/AdminModel');


const adminController = {
    getProfile: async (req, res) => {
        const { adminId } = req.params;

        try {
            const admin = await AdminModel.findById(adminId);

            if (!admin) {
                return res.status(404).json({ success: false, message: "Admin not found" });
            }

            return res.status(200).json({ success: true, 
                                          adminId: admin._id,
                                          username: admin.username,
                                          avatar: admin.avatar || "", 
            });
        } catch (error) {
            console.error("Error during login: ", error);
            return res.status(500).json({ success: false, message: "An error occurred while processing the login" });
        }
    },

  

};

module.exports = adminController;