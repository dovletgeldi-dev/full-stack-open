import { useEffect, useRef } from "react";
import blogService from "./services/blogs";
import Notifications from "./components/Notifications";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initialBlogs } from "./redux/blogSlice";
import { loadUsers } from "./redux/userSlice";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  const loginUser = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initialBlogs());
    dispatch(loadUsers());

    if (loginUser === null) {
      navigate("/login");
    } else {
      blogService.setToken(loginUser.token);
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Notifications />

      <h1>Blog App</h1>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <Outlet />
    </div>
  );
};

export default App;
