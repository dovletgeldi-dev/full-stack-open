const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const mongoUrl = config.MONGODB_URI;

console.log("connecting to", mongoUrl);

mongoose
  .connect(mongoUrl)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB: ", error.message);
  });

app.use(cors());
app.use(express.json());

morgan.token("body", (request) => {
  return JSON.stringify(request.body);
});
app.use(morgan("tiny"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);

app.use("/api/users", userRouter);

app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
