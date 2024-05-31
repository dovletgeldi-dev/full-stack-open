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
    newComment(state, action) {
      const id = action.payload.id;
      const addedComment = action.payload;

      return state.map((blog) => {
        return blog.id !== id ? blog : addedComment;
      });
    },
    addLike(state, action) {
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

export const { setBlogs, addBlog, newComment, addLike, removeBlog } =
  blogSlice.actions;

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

export const addComment = (id, commentToAdd) => {
  return async (dispatch) => {
    const comment = await blogService.createComment(id, commentToAdd);
    dispatch(newComment(comment));
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
