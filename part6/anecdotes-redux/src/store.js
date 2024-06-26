import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";

import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filters: filterReducer,
    notifications: notificationReducer,
  },
});

export default store;
