import { createSlice } from "@reduxjs/toolkit";

import userService from "../services/users";

export const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      console.log(action);
      return (state = action.payload);
    },
  },
});

export const { setUsers } = userSlice.actions;

export const loadUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export default userSlice.reducer;
