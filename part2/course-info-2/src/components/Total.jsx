/* eslint-disable react/prop-types */
const Total = ({ course: { parts } }) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0);
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

export default Total;
