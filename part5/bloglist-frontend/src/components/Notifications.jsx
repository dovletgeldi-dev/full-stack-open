import React from "react";

function Notifications({ message, isSuccess }) {
  if (message === null) {
    return null;
  }

  return (
    <div
      style={{
        padding: "1rem",
        margin: "1rem 0",
        borderRadius: "10px",
        border: isSuccess ? "3px solid green" : "3px solid red",
        color: isSuccess ? "green" : "red",
        backgroundColor: "lightgray",
      }}
    >
      {message}
    </div>
  );
}

export default Notifications;
