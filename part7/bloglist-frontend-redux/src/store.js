import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./redux/notificationSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
  },
});
