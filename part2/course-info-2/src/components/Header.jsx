/* eslint-disable react/prop-types */
const Header = ({ course: { name } }) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
};

export default Header;
