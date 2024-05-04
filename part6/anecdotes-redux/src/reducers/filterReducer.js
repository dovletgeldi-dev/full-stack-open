import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filtersSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterSearched(state, action) {
      return action.payload;
    },
  },
});

export const { filterSearched } = filtersSlice.actions;
export default filtersSlice.reducer;
