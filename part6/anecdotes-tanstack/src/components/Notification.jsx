import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

const Notification = () => {
  const [notification] = useContext(NotificationContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (notification === "") {
    return <></>;
  }

  console.log(notification.action);

  return <div style={style}>{notification.action}</div>;
};

export default Notification;
