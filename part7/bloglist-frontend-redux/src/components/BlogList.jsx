import React from "react";
import Blog from "./Blog";
import { useSelector } from "react-redux";

function BlogList() {
  const blogs = useSelector((state) => state.blogs);

  const sortedBlogs = [...blogs].sort(
    (a, b) => Number(b.likes) - Number(a.likes)
  );
  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default BlogList;
