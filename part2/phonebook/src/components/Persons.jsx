/* eslint-disable react/prop-types */
const Persons = ({ persons, filterQuery }) => {
  return (
    <div>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filterQuery))
        .map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
    </div>
  );
};

export default Persons;
