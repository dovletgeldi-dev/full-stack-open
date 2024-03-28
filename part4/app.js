const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const config = require("./utils/config");

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

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;
