import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../redux/blogSlice";
import { setNotification } from "../redux/notificationSlice";
import { setTypeOfNotification } from "../redux/notificationTypeSlice";

function BlogForm({ user }) {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login);

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLikes, setNewLikes] = useState("");
  const [userId, setUser] = useState(loginUser.id);

  const addBlog = (event) => {
    event.preventDefault();

    console.log(newTitle, newAuthor, newUrl, newLikes, user);

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes || 0,
      user: userId,
    };

    dispatch(createBlog(newBlog));

    dispatch(
      setNotification(
        `a new blog ${newBlog.title} by ${newBlog.title} added`,
        3000,
        true
      )
    );

    dispatch(setTypeOfNotification(true));

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    setNewLikes("");
  };
  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          name="Title"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          required
          placeholder="title"
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="Author"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
          required
          placeholder="author"
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="URL"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
          required
          placeholder="url"
        />
      </div>
      <div>
        likes:
        <input
          type="text"
          name="Likes"
          value={newLikes}
          onChange={({ target }) => setNewLikes(target.value)}
          placeholder="likes"
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
}

export default BlogForm;
