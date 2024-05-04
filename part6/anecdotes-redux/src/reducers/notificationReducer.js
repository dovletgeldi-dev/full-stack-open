import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationsSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return (state = action.payload);
    },
    removeNotification() {
      return initialState;
    },
  },
});

export const { showNotification, removeNotification } =
  notificationsSlice.actions;

export const setNotification = (text, duration) => {
  return async (dispatch) => {
    dispatch(showNotification(text));
    setTimeout(() => {
      dispatch(removeNotification());
    }, duration);
  };
};
export default notificationsSlice.reducer;
