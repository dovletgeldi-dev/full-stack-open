import React, { useDebugValue } from "react";
import { useSelector, useDispatch } from "react-redux";
import { current } from "@reduxjs/toolkit";

function Notifications({ isSuccess }) {
  const notification = useSelector((state) => state.notifications);

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
        border: isSuccess ? "3px solid green" : "3px solid red",
        color: isSuccess ? "green" : "red",
        backgroundColor: "lightgray",
      }}
    >
      {notification}
    </div>
  );
}

export default Notifications;
