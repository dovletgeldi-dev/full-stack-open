const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const middleware = require("./utils/middleware");
const { MONGODB_URI } = require("./utils/config");
const personRouter = require("./controllers/persons");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB: ", error.message);
  });

app.use(cors());
morgan.token("body", (request) => {
  return JSON.stringify(request.body);
});
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("dist"));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use("/api/persons", personRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = {
  app,
};
