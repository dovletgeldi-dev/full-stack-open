import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return (state = action.payload);
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const { showNotification, clearNotification } =
  notificationSlice.actions;

export const setNotification = (text, duration) => {
  return async (dispatch) => {
    dispatch(showNotification(text));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration);
  };
};

export default notificationSlice.reducer;
