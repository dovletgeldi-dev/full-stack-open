import { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(blog.user.name);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div
      style={{ border: "2px solid black", margin: "1rem 0", padding: "1rem" }}
      className="blog"
    >
      {!visible ? (
        <>
          {blog.title} {blog.author}{" "}
          <button onClick={toggleVisibility}>
            {visible ? "hide" : "view"}
          </button>
        </>
      ) : (
        <div>
          <div>
            {blog.title} {blog.author}{" "}
            <button onClick={toggleVisibility}>
              {visible ? "hide" : "view"}
            </button>
          </div>
          <p>{blog.url}</p>
          <p>
            {blog.likes}
            <button id="like-button" onClick={() => handleLike(blog)}>
              like
            </button>
          </p>
          <p>{user}</p>
          <button
            style={{
              display: "block",
              border: "0",
              borderRadius: "5px",
              padding: "0.5rem",
              backgroundColor: "red",
              color: "white",
            }}
            onClick={() => handleDelete(blog)}
          >
            remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
