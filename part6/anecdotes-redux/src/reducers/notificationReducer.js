import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationsSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notifyAction(state, action) {
      return (state = action.payload);
    },
    removeNotification() {
      return initialState;
    },
  },
});

export const { notifyAction, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
