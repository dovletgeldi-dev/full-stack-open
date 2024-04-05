const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const users = await User.findById(decodedToken.id);

  // Check if there are any users
  if (users.length === 0) {
    return response.status(400).json({ error: "No users found" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: users.id,
  });

  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

  const savedBlog = await blog.save();

  // Update the user's blogs array with the new blog's ID
  users.blogs = users.blogs.concat(savedBlog._id);
  await users.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  const decodedToken = jwt.verify(request.token, config.SECRET);
  const users = decodedToken.id;

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  if (blog.user.toString() !== users.toString()) {
    return response.status(401).json({
      error: "unauthorized. blogs can only be deleted by the user who added it",
    });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true }
  );

  response.json(updatedBlog);
});

module.exports = blogsRouter;
