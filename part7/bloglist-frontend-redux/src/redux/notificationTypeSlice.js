import { createSlice } from "@reduxjs/toolkit";

const notificationTypeSlice = createSlice({
  name: "notificationType",
  initialState: true,
  reducers: {
    setTypeOfNotification(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setTypeOfNotification } = notificationTypeSlice.actions;

export default notificationTypeSlice.reducer;
