import React from "react";
import "../styles/Notification.scss";

const Notification = () => {
  const notifications = [
    { id: 1, message: "Your product #1234 has been purchased", time: "3 hours ago" },
    { id: 2, message: "Your product #1234 has been purchased", time: "3 hours ago" },
    { id: 3, message: "Your product #1234 has been purchased", time: "3 hours ago" },
    { id: 4, message: "Your product #1234 has been purchased", time: "3 hours ago" },
    { id: 5, message: "Your product #1234 has been purchased", time: "3 hours ago" },
  ];

  return (
    <div className="notification-container">
      <div className="notification-header">Notification</div>
      {notifications.map((item) => (
        <div key={item.id} className="notification-item">
          <p className="notification-message">{item.message}</p>
          <span className="notification-time">{item.time}</span>
        </div>
      ))}
    </div>
  );
};

export default Notification;
