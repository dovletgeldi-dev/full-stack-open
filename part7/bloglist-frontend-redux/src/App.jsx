import { useEffect, useRef } from "react";
import blogService from "./services/blogs";
import Notifications from "./components/Notifications";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import LoggedUser from "./components/LoggedUser";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import { useDispatch, useSelector } from "react-redux";
import { initialBlogs } from "./redux/blogSlice";
import { loadUsers } from "./redux/userSlice";
import Blog from "./components/Blog";

const App = () => {
  const loginUser = useSelector((state) => state.login);

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialBlogs());
    dispatch(loadUsers());

    if (loginUser === null) {
      return;
    } else {
      blogService.setToken(loginUser.token);
    }
  }, [dispatch]);

  return (
    <div>
      <h1>Blog App</h1>
      <Notifications />

      {loginUser === null ? (
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      ) : (
        <div>
          <LoggedUser />

          <h2>create new blog</h2>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>

          <h2>blogs</h2>

          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
