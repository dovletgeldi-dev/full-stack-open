import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

export const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return (state = action.payload);
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    addLike(state, action) {
      console.log(action);

      const id = action.payload.id;
      const changedBlog = action.payload;

      return state.map((blog) => {
        return blog.id !== id ? blog : changedBlog;
      });
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
  },
});

export const { setBlogs, addBlog, addLike, removeBlog } = blogSlice.actions;

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogToCreate) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogToCreate);
    dispatch(addBlog(newBlog));
  };
};

export const likeBlog = (id, updatedBlog) => {
  return async (dispatch) => {
    const blog = await blogService.update(id, updatedBlog);
    dispatch(addLike(blog));
  };
};

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    await blogService.remove(blogToDelete);
    dispatch(removeBlog(blogToDelete));
  };
};

export default blogSlice.reducer;
