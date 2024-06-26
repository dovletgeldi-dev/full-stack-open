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

  const [refreshBlog, setRefreshBlog] = useState(false);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    console.log(blogs);
  }, [refreshBlog]);

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
  };

  const handleNewBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();

    blogService
      .create(blogObject)
      .then((createBlog) => {
        setBlogs(blogs.concat(createBlog));
        setIsSuccess(true);
        setMessage(
          `a new blog ${createBlog.title} by ${createBlog.title} added`
        );
        setRefreshBlog(!refreshBlog);

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
          setMessage(
            `Successfully removed ${blogToDelete.title} by ${blogToDelete.author} from blogs`
          );
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
        })
        .catch((exception) => {
          console.log(exception.response.data.error);
          setIsSuccess(false);
          setMessage(
            `unauthorized! blogs can only be deleted by the user who added it`
          );
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
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
