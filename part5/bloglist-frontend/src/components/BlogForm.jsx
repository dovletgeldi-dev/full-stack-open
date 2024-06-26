import React, { useState } from "react";

function BlogForm({ createBlog, user }) {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLikes, setNewLikes] = useState("");
  const [userId, setUser] = useState(user.id);

  const addBlog = (event) => {
    event.preventDefault();

    console.log(newTitle, newAuthor, newUrl, newLikes, user);

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes || 0,
      user: userId,
    });

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
