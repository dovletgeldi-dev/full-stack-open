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

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialBlogs());
    if (user === null) {
      return;
    } else {
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  return (
    <div>
      <h1>Blog App</h1>
      <Notifications />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      ) : (
        <div>
          <LoggedUser />

          <h2>create new blog</h2>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm user={user} />
          </Togglable>

          <h2>blogs</h2>

          <BlogList user={user} blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
