/* eslint-disable react/prop-types */
const PersonForm = ({
  handleAddName,
  name,
  number,
  handleNumber,
  handleName,
}) => {
  return (
    <form onSubmit={handleAddName}>
      <div>
        name: <input value={name} onChange={handleName} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
