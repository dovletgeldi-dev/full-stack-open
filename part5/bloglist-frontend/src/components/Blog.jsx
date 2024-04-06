import { useState } from "react";

const Blog = ({ blog, handleClick }) => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(blog.user.name);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div
      style={{ border: "2px solid black", margin: "1rem 0", padding: "1rem" }}
    >
      {blog.title} {blog.author}{" "}
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      {!visible ? (
        <></>
      ) : (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes}
            <button onClick={() => handleClick(blog)}>like</button>
          </p>
          <p>{user}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
