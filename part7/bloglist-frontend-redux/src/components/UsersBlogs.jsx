import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../redux/userSlice";

function UsersBlogs() {
  const users = useSelector((state) => state.users);

  const paramsId = useParams();
  const dispatch = useDispatch();

  const user = users.find((user) => user.id === paramsId.userId);

  console.log(user);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersBlogs;
