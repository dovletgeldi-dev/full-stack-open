import React from "react";
import { useSelector } from "react-redux";

function Notifications() {
  const notification = useSelector((state) => state.notifications);
  const typeOfNotification = useSelector((state) => state.typeOfNotification);

  if (notification === null) {
    return null;
  }

  return (
    <div
      style={{
        display: notification.length === 0 ? "none" : "block",
        padding: "1rem",
        margin: "1rem 0",
        borderRadius: "10px",
        border: typeOfNotification ? "3px solid green" : "3px solid red",
        color: typeOfNotification ? "green" : "red",
        backgroundColor: "lightgray",
      }}
    >
      {notification}
    </div>
  );
}

export default Notifications;
