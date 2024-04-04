const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  // Check if a user with the given username already exists
  const existingUser = await User.findOne({ username });

  if (username.length < 3 || password.length < 3) {
    // If the username and password less than 3 characters, return a 400 status code and the error message
    return response.status(400).json({
      error:
        "expected `username` and `password` to be at least 3 characters long",
    });
  } else if (existingUser) {
    // If the user exists, return a 400 status code and the error message
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.delete("/:id", async (request, response) => {
  await User.findByIdAndDelete(request.params.id);

  response.status(204).end();
});

module.exports = usersRouter;
