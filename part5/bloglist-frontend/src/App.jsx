import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notifications from "./components/Notifications";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import LoggedUser from "./components/LoggedUser";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    console.log(blogs);
  }, []);

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
      setMessage("Logged in successfully!");
      setIsSuccess(true);
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (exception) {
      console.log(exception);
      setIsSuccess(false);
      setMessage("Wrong username or password");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    setMessage("Logged out successfully!");
    setIsSuccess(true);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleNewBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();

    blogService
      .create(blogObject)
      .then((createBlog) => {
        setBlogs(blogs.concat(createBlog));
        setIsSuccess(true);
        setMessage(`a new blog ${newTitle} by ${newAuthor} added`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch((exception) => {
        console.log(exception);
      });
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

  return (
    <div>
      <h1>Blog App</h1>
      <Notifications message={message} isSuccess={isSuccess} />

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
            <BlogForm createBlog={handleNewBlog} user={user} />
          </Togglable>

          <h2>blogs</h2>

          <BlogList blogs={blogs} handleClick={handleAddLike} />
        </div>
      )}
    </div>
  );
};

export default App;
