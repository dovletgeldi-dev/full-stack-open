import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";

function LoggedUser() {
  const user = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    window.localStorage.clear();
    dispatch(logOut());
  };

  return (
    <div>
      <p>{user.name} logged-in</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default LoggedUser;
