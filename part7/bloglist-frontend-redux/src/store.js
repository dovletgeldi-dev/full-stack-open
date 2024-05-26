import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./redux/notificationSlice";
import blogReducer from "./redux/blogSlice";
import typeOfNotificationReducer from "./redux/notificationTypeSlice";
import loginReducer from "./redux/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    blogs: blogReducer,
    notifications: notificationReducer,
    typeOfNotification: typeOfNotificationReducer,
  },
});
