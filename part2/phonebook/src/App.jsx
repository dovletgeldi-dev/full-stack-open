/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notifications from "./components/Notifications";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

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
      setMessage(`Added ${newName}`);
      setIsSuccess(true);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
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

  const handlePersonDelete = (personToDelete) => {
    console.log(personToDelete);
    if (!window.confirm(`Delete ${personToDelete.name} ?`)) {
      return null;
    } else {
      personService
        .deletePerson(personToDelete)
        .then(() => {
          setPersons(
            persons.filter((person) => person.id !== personToDelete.id)
          );
        })
        .catch((error) => {
          console.log(error);
          setIsSuccess(false);
          setMessage(
            `Information of ${personToDelete.name} has already been removed from server `
          );
          setPersons(
            persons.filter((person) => person.id !== personToDelete.id)
          );
          setTimeout(() => {
            setMessage(null);
          }, 5000);
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
      <Notifications message={message} isSuccess={isSuccess} />
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
