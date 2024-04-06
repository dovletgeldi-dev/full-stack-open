import React from "react";

function BlogForm({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleLikesChange,
  newTitle,
  newAuthor,
  newUrl,
  newLikes,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          type="text"
          name="Title"
          value={newTitle}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="Author"
          value={newAuthor}
          onChange={handleAuthorChange}
          required
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="URL"
          value={newUrl}
          onChange={handleUrlChange}
          required
        />
      </div>
      <div>
        likes:
        <input
          type="number"
          name="Likes"
          value={newLikes}
          onChange={handleLikesChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
}

export default BlogForm;
