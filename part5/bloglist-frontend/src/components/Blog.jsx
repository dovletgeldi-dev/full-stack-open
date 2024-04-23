import { useState } from "react";

const Blog = ({ currentUser, blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const showDelete = currentUser.name === blog.user.name ? true : false;

  return (
    <div
      style={{ border: "2px solid black", margin: "1rem 0", padding: "1rem" }}
      className="blog"
    >
      {!visible ? (
        <div>
          <span data-testid="titleOutput">{blog.title}</span>{" "}
          <span data-testid="authorOutput">{blog.author}</span>
          <button onClick={toggleVisibility}>
            {visible ? "hide" : "view"}
          </button>
        </div>
      ) : (
        <div>
          <div>
            <span>{blog.title}</span> <span>{blog.author}</span>
            <button onClick={toggleVisibility}>
              {visible ? "hide" : "view"}
            </button>
          </div>
          <p>{blog.url}</p>
          <p data-testid="likes">
            {blog.likes}
            <button id="like-button" onClick={() => handleLike(blog)}>
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          {showDelete && (
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
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
