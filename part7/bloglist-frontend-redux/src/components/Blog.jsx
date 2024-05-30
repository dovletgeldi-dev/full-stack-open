import { useState } from "react";
import { deleteBlog, initialBlogs, likeBlog } from "../redux/blogSlice";
import { setNotification } from "../redux/notificationSlice";
import { setTypeOfNotification } from "../redux/notificationTypeSlice";
import { useDispatch, useSelector } from "react-redux";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login);

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const showDelete = loginUser.name === blog.user.name ? true : false;

  const handleAddLike = (blogToAddLike) => {
    console.log(blogToAddLike);

    const newUpdatedLikeBlog = {
      ...blogToAddLike,
      likes: blogToAddLike.likes + 1,
    };
    dispatch(likeBlog(blogToAddLike.id, newUpdatedLikeBlog));
    dispatch(setTypeOfNotification(true));
    dispatch(setNotification(`you liked '${blogToAddLike.title}'`, 3000));
    dispatch(initialBlogs());
  };

  const handleDeleteBlog = (blogToDelete) => {
    console.log(blogToDelete.id, blogToDelete.user.id, loginUser.id);

    if (
      !window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author} ?`
      )
    ) {
      return null;
    } else {
      dispatch(deleteBlog(blogToDelete));
      dispatch(setTypeOfNotification(true));
      dispatch(
        setNotification(
          `Successfully removed ${blogToDelete.title} by ${blogToDelete.author} from blogs`,
          3000
        )
      );
      dispatch(initialBlogs());
    }
  };

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
            <button id="like-button" onClick={() => handleAddLike(blog)}>
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
              onClick={() => handleDeleteBlog(blog)}
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
