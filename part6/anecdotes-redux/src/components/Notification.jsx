import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  const style = {
    display: notification.length === 0 ? "none" : "block",
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
