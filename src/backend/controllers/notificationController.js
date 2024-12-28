const NotificationModel = require("../models/NotificationModel");

const notificationController = {
    getNotifications: async (req, res) => {
        try {
            const { receiverID } = req.params;
            const { role } = req.query;

            const filter = { receiverID };
            if (role) {
                filter.role = role; 
            }

            const notifications = await NotificationModel.find(filter)
                .sort({ timestamp: -1 }) 
                .limit(50); 

            return res.status(200).json({ success: true, notifications });
        } catch (error) {
            console.error("Error fetching notifications:", error);
            return res.status(500).json({ success: false, message: "Failed to fetch notifications." });
        }
    },

    markAsRead: async (req, res) => {
        try {
            const { notificationID } = req.params;
    
            const updatedNotification = await NotificationModel.findByIdAndUpdate(
                notificationID,
                { isRead: true },
                { new: true }
            );
    
            if (!updatedNotification) {
                return res.status(404).json({ success: false, message: "Notification not found" });
            }
    
            res.status(200).json({
                success: true,
                message: "Notification marked as read",
                notification: updatedNotification,
            });
        } catch (error) {
            console.error("Error marking notification as read:", error);
            return res.status(500).json({ success: false, message: "Failed to update notification." });
        }
    },
  

};

module.exports = notificationController;