const blogsRouter = require("express").Router();
const { request } = require("../app");
const Blog = require("../models/blog");

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

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

  const savedBlog = await blog.save();

  // Update the user's blogs array with the new blog's ID
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const comment = request.body.text; // Get comment content from request body
  const blog = await Blog.findById(request.params.id); // Find the blog by ID

  try {
    if (!blog) {
      return response.status(404).json({ message: "blog not found" });
    }

    const newComment = {
      text: comment,
    };

    if (newComment.text === "") {
      return response.status(404).json({ message: "comment cannot be empty" });
    }

    blog.comments.push(newComment);

    // Save the updated blog with the added comment
    const savedBlog = await blog.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() !== request.user.id.toString()) {
    return response.status(401).json({
      error: "unauthorized! blogs can only be deleted by the user who added it",
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
