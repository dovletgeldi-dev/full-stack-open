/* eslint-disable react/prop-types */
const Header = ({ course: { name } }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default Header;
