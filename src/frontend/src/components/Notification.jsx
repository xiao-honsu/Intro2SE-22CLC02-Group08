import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import notificationAPI from "../services/notification";
import "../styles/Notification.scss";

const Notification = ({ receiverID, role, onUnreadStatusChange }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await notificationAPI.getNotification(receiverID, role);
            if (response.success) {
                setNotifications(response.notifications);

                const hasUnread = response.notifications.some((notification) => !notification.isRead);
                onUnreadStatusChange(hasUnread);
            } else {
                console.error(response.message);
            }
            setLoading(false);
        };

        if (receiverID && role) {
            fetchNotifications();
        }
    }, [receiverID, role]);


    const handleMarkAsRead = async (notificationID) => {
        const response = await notificationAPI.markAsRead(notificationID);
        if (response.success) {
            setNotifications((prevNotifications) =>
                prevNotifications.map((noti) =>
                    noti._id === notificationID ? { ...noti, isRead: true } : noti
                )
            );

            const hasUnread = notifications.some((notification) => notification._id !== notificationID && !notification.isRead);
            onUnreadStatusChange(hasUnread);
        }
    };

    if (loading) {
        return <div></div>;
    }

    return (
        <div className="notification-container">
            <div className="notification-header">Notification</div>
            {notifications.map((item) => (
                <div key={item._id} className={`notification-item ${item.isRead ? "read" : "unread"}`} onClick={() => handleMarkAsRead(item._id)} >
                    {item.isRead ? (
              <FontAwesomeIcon icon={faCheckCircle} className="icon-read" />
            ) : (
              <FontAwesomeIcon icon={faCircle} className="icon-unread" />
            )}
                    <p className="notification-message">{item.content}</p>
                    <span className="notification-time">{new Date(item.timestamp).toLocaleString()}</span>
                </div>
            ))}
        </div>
    );
};

export default Notification;
