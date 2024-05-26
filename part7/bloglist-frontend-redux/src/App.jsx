import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notifications from "./components/Notifications";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import LoggedUser from "./components/LoggedUser";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./redux/notificationSlice";
import { createBlog, initialBlogs, likeBlog } from "./redux/blogSlice";
import { setTypeOfNotification } from "./redux/notificationTypeSlice";

const App = () => {
  const blogs = useSelector((state) => state.blogs);

  console.log(blogs);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      dispatch(setNotification("Logged in successfully!", 3000));
      dispatch(setTypeOfNotification(true));
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      dispatch(setTypeOfNotification(false));
      dispatch(setNotification("Wrong username or password", 3000));
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div>
      <h1>Blog App</h1>
      <Notifications />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </Togglable>
      ) : (
        <div>
          <LoggedUser user={user} handleClick={handleLogout} />

          <h2>create new blog</h2>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm user={user} />
          </Togglable>

          <h2>blogs</h2>

          <BlogList currentUser={user} blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
