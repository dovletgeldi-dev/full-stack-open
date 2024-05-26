import React from "react";
import Blog from "./Blog";

function BlogList({ user, blogs }) {
  const sortedBlogs = [...blogs].sort(
    (a, b) => Number(b.likes) - Number(a.likes)
  );
  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog currentUser={user} key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default BlogList;
