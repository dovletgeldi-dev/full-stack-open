import React, { useEffect, useState } from "react";
import {
  addComment,
  deleteBlog,
  initialBlogs,
  likeBlog,
} from "../redux/blogSlice";
import { setNotification } from "../redux/notificationSlice";
import { setTypeOfNotification } from "../redux/notificationTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function BlogDetails() {
  const blogs = useSelector((state) => state.blogs);
  const loginUser = useSelector((state) => state.login);

  const paramsId = useParams().blogId;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blog = blogs.find((blog) => blog.id === paramsId);

  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(initialBlogs());
  }, [dispatch]);

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
      navigate("/blogs");
      dispatch(initialBlogs());
    }
  };

  const handleComment = (event) => {
    event.preventDefault();

    const newComment = {
      text: comment,
    };

    dispatch(addComment(paramsId, newComment));

    setComment("");
  };

  return (
    <div>
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

      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input
          type="text"
          name="Title"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          required
          placeholder="title"
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default BlogDetails;
