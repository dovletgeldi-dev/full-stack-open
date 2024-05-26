import React from "react";
import Blog from "./Blog";

function BlogList({ currentUser, blogs }) {
  return (
    <div>
      {blogs
        .map((blog) => (
          <Blog currentUser={currentUser} key={blog.id} blog={blog} />
        ))
        .sort((a, b) => b.likes - a.likes)}
    </div>
  );
}

export default BlogList;
