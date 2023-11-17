/* eslint-disable react/prop-types */
const PersonForm = ({
  handleSubmit,
  name,
  number,
  handleNumber,
  handleName,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          name: <input value={name} onChange={handleName} />
        </label>
      </div>
      <div>
        <label>
          number: <input value={number} onChange={handleNumber} />
        </label>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
