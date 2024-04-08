import React from "react";
import Blog from "./Blog";

function BlogList({ blogs, handleLike, handleDelete }) {
  const sortedBlog = blogs.sort((a, b) =>
    a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0
  );

  return (
    <div>
      {sortedBlog.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default BlogList;
