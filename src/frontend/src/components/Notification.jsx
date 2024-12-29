import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import "../styles/Notification.scss";

const Notification = ({ notifications = [], onMarkAsRead }) => {
    return (
        <div className="notification-container">
            <div className="notification-header">Notification</div>
                {notifications.length > 0 ? (
                    notifications.map((item) => (
                        <div key={item._id} className={`notification-item ${item.isRead ? "read" : "unread"}`} onClick={() => onMarkAsRead(item._id)} >
                            {item.isRead ? (
                                <FontAwesomeIcon icon={faCheckCircle} className="icon-read" />
                            ) : (
                                <FontAwesomeIcon icon={faCircle} className="icon-unread" />
                            )}
                            <p className="notification-message">{item.content}</p>
                            <span className="notification-time">{new Date(item.timestamp).toLocaleString()}</span>
                        </div>
                    ))
                ) : (
                    <div className="notification-empty">No notifications</div>
                )}
        </div>
    );
};

export default Notification;
