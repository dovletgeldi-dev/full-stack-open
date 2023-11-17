/* eslint-disable react/prop-types */
const Persons = ({ persons, filterQuery, handleDelete }) => {
  return (
    <div>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filterQuery))
        .map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person)}>delete</button>
          </p>
        ))}
    </div>
  );
};

export default Persons;
