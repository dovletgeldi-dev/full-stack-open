import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notifications from "./components/Notifications";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLikes, setNewLikes] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>
        <div>
          password:
          <input
            type="text"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const loggedUser = () => {
    console.log(user.token);
    return (
      <p>
        {user.name} logged-in <button onClick={handleLogout}>logout</button>
      </p>
    );
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();

    console.log(newTitle, newAuthor, newUrl, newLikes, user);

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
      user: user.id,
    };

    blogService
      .create(newBlog)
      .then((createBlog) => {
        setBlogs(blogs.concat(createBlog));
        setIsSuccess(true);
        setMessage(`a new blog ${newTitle} by ${newAuthor} added`);
        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
        setNewLikes("");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch((exception) => {
        console.log(exception);
      });
  };

  const blogForm = () => {
    return (
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            name="Title"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            required
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            required
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="URL"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            required
          />
        </div>
        <div>
          likes:
          <input
            type="number"
            name="Likes"
            value={newLikes}
            onChange={({ target }) => setNewLikes(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    );
  };

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Blog App</h1>
      <Notifications message={message} isSuccess={isSuccess} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          {loggedUser()}
          <h2>create new blog</h2>
          {blogForm()}
          <br />
          {blogList()}
        </div>
      )}
    </div>
  );
};

export default App;
