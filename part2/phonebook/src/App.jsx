/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const updatePerson = () => {
    if (
      !window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    )
      return;

    const person = persons.find((p) => p.id === p.id);
    console.log(person);
    const changedNumber = { ...person, number: newNumber };
    personService.update(person.id, changedNumber).then((response) => {
      setPersons(persons.map((p) => (p.id !== person.id ? p : response)));
      setNewName("");
      setNewNumber("");
    });
  };

  const addPerson = (newPerson) => {
    personService.create(newPerson).then((createPerson) => {
      setPersons(persons.concat(createPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      updatePerson();
    } else {
      addPerson(newPerson);
    }
  };

  const handlePersonDelete = (personToDeleteId) => {
    console.log(personToDeleteId);
    if (!window.confirm(`Delete ${personToDeleteId.name} ?`)) {
      return null;
    } else {
      personService.deletePerson(personToDeleteId).then(() => {
        setPersons(
          persons.filter((person) => person.id !== personToDeleteId.id)
        );
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterQuery = (event) => {
    setFilterQuery(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={filterQuery} handleQuery={handleFilterQuery} />

      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        name={newName}
        handleName={handleNameChange}
        number={newNumber}
        handleNumber={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filterQuery={filterQuery}
        handleDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
