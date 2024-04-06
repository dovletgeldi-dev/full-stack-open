import React from "react";
import Blog from "./Blog";

function BlogList({ blogs, handleClick }) {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleClick={handleClick} />
      ))}
    </div>
  );
}

export default BlogList;
