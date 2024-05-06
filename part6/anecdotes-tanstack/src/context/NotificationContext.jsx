/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const initialState = "";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return (state = action);
    case "CLEAR":
      return (state = initialState);
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
