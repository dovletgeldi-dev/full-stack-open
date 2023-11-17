/* eslint-disable react/prop-types */
const Filter = ({ query, handleQuery }) => {
  return (
    <div>
      <label>
        filter shown with <input value={query} onChange={handleQuery} />
      </label>
    </div>
  );
};

export default Filter;
