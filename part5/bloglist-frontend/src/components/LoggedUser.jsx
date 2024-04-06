import React from "react";

function LoggedUser({ user, handleClick }) {
  return (
    <p>
      {user.name} logged-in <button onClick={handleClick}>logout</button>
    </p>
  );
}

export default LoggedUser;
