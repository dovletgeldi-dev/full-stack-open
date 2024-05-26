import React from "react";
import Blog from "./Blog";

function BlogList({ currentUser, blogs, handleLike, handleDelete }) {
  return (
    <div>
      {blogs
        .map((blog) => (
          <Blog
            currentUser={currentUser}
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        ))
        .sort((a, b) => b.likes - a.likes)}
    </div>
  );
}

export default BlogList;
