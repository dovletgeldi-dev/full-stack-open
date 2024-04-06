import React from "react";
import Blog from "./Blog";

function BlogList({ blogs, handleClick }) {
  const newBlog = blogs.sort((a, b) =>
    a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0
  );

  return (
    <div>
      {newBlog.map((blog) => (
        <Blog key={blog.id} blog={blog} handleClick={handleClick} />
      ))}
    </div>
  );
}

export default BlogList;
