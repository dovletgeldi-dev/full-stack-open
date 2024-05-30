import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./redux/notificationSlice";
import blogReducer from "./redux/blogSlice";
import typeOfNotificationReducer from "./redux/notificationTypeSlice";
import loginReducer from "./redux/loginSlice";
import userReducer from "./redux/userSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    blogs: blogReducer,
    users: userReducer,
    notifications: notificationReducer,
    typeOfNotification: typeOfNotificationReducer,
  },
});
