import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/loginSlice";

function LoggedUser() {
  const user = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    window.localStorage.clear();
    dispatch(logOut());
  };

  return (
    <p>
      {user.name} logged-in <button onClick={handleLogout}>logout</button>
    </p>
  );
}

export default LoggedUser;
