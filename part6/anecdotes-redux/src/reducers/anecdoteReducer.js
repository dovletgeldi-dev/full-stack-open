import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

/* eslint-disable no-case-declarations */

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    anecdoteVoted(state, action) {
      const anecdote = state.find((v) => v.id === action.payload);
      anecdote.votes += 1;
    },
    anecdoteAdded(state, action) {
      const content = action.payload;
      state.push({
        id: getId(),
        content,
        votes: 0,
      });
    },
    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { anecdoteVoted, anecdoteAdded, appendAnecdotes, setAnecdotes } =
  anecdotesSlice.actions;

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(anecdoteAdded(newAnecdote.content));
  };
};
export default anecdotesSlice.reducer;
