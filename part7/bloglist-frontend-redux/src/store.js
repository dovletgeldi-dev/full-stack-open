import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./redux/notificationSlice";
import blogReducer from "./redux/blogSlice";
import typeOfNotificationReducer from "./redux/notificationTypeSlice";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notifications: notificationReducer,
    typeOfNotification: typeOfNotificationReducer,
  },
});
