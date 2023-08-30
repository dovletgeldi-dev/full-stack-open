/* eslint-disable react/prop-types */
const Filter = ({ query, handleQuery }) => {
  return (
    <div>
      filter shown with <input value={query} onChange={handleQuery} />
    </div>
  );
};

export default Filter;
