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
import { createBlog, initialBlogs } from "./redux/blogSlice";

const App = () => {
  const blogs = useSelector((state) => state.blogs);

  console.log(blogs);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const [isSuccess, setIsSuccess] = useState(null);

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
      setIsSuccess(true);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setIsSuccess(false);
      dispatch(setNotification("Wrong username or password", 3000));
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleAddLike = (blogToAddLike) => {
    const newUpdatedLikeBlog = {
      ...blogToAddLike,
      likes: ++blogToAddLike.likes,
    };

    blogService
      .update(blogToAddLike.id, newUpdatedLikeBlog)
      .then((response) => {
        setBlogs(
          blogs.map((blog) => (blog.id !== blogToAddLike.id ? blog : response))
        );
      });
  };

  const handleDeleteBlog = (blogToDelete) => {
    console.log(blogToDelete.id, blogToDelete.user.id, user.id);

    if (
      !window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author} ?`
      )
    ) {
      return null;
    } else {
      blogService
        .remove(blogToDelete)
        .then(() => {
          setIsSuccess(true);
          dispatch(
            setNotification(
              `Successfully removed ${blogToDelete.title} by ${blogToDelete.author} from blogs`,
              3000
            )
          );
          setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
        })
        .catch((exception) => {
          console.log(exception.response.data.error);
          setIsSuccess(false);
          dispatch(
            setNotification(
              `unauthorized! blogs can only be deleted by the user who added it`,
              3000
            )
          );
        });
    }
  };

  return (
    <div>
      <h1>Blog App</h1>
      <Notifications isSuccess={isSuccess} />

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

          <BlogList
            currentUser={user}
            blogs={blogs}
            handleLike={handleAddLike}
            handleDelete={handleDeleteBlog}
          />
        </div>
      )}
    </div>
  );
};

export default App;
