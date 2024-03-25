require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (request) => {
  return JSON.stringify(request.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const date = new Date().toString();
console.log(date);

// Display Text
// app.get("/info", (req, res) => {
//   res.send(
//     `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
//   );
// });

// List all
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

// List unique
app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  });
});

// Delete unique
// app.delete("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   persons = persons.filter((person) => person.id !== id);

//   res.status(204).end();
// });

// Add one
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  } else {
    const person = new Person({
      name: body.name,
      number: body.number,
    });

    person.save().then((savedPerson) => {
      res.json(savedPerson);
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
