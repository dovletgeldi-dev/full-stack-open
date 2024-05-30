import React, { useEffect } from "react";
import { deleteBlog, initialBlogs, likeBlog } from "../redux/blogSlice";
import { setNotification } from "../redux/notificationSlice";
import { setTypeOfNotification } from "../redux/notificationTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoggedUser from "./LoggedUser";

function BlogDetails() {
  const blogs = useSelector((state) => state.blogs);
  const loginUser = useSelector((state) => state.login);

  const paramsId = useParams().blogId;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blog = blogs.find((blog) => blog.id === paramsId);

  useEffect(() => {
    dispatch(initialBlogs());
  }, [dispatch]);

  // const showDelete = loginUser.name === blog.user.name ? true : false;

  if (!blog) {
    return null;
  }

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
      navigate("/");
      dispatch(initialBlogs());
    }
  };

  return (
    <div>
      <h1>Blog App</h1>
      <LoggedUser />
      <h2>
        {blog.title} {blog.author}
      </h2>

      <a href={blog.url}>{blog.url}</a>
      <p data-testid="likes">
        {blog.likes}
        <button id="like-button" onClick={() => handleAddLike(blog)}>
          like
        </button>
      </p>
      <p>{blog.user.name}</p>
      {loginUser.name === blog.user.name ? (
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
      ) : null}
    </div>
  );
}

export default BlogDetails;
