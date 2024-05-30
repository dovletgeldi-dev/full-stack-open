import { Link } from "react-router-dom";
import LoggedUser from "./LoggedUser";

const Navbar = () => {
  return (
    <nav>
      <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        <p>
          <Link to="/blogs">blogs</Link>
        </p>
        <p>
          <Link to="/users">users</Link>
        </p>
        <LoggedUser />
      </div>
    </nav>
  );
};

export default Navbar;
