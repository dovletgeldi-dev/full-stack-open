const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({});
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
  const blog = new Blog(request.body);

  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
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
