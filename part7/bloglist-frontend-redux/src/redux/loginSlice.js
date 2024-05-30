import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const initialState = window.localStorage.getItem("loggedBlogUser")
  ? JSON.parse(localStorage.getItem("loggedBlogUser"))
  : null;

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin(state, action) {
      console.log(action);
      return (state = action.payload);
    },
    logOut(state) {
      return (state = initialState);
    },
  },
});

export const { setLogin, logOut } = loginSlice.actions;

export const initialLogin = (newUser) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(newUser);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setLogin(user));
      return true;
    } catch (error) {
      return false;
    }
  };
};

export default loginSlice.reducer;
