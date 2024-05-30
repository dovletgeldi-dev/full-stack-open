import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";

function LoggedUser() {
  const user = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleLogout = async () => {
    window.localStorage.clear();
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div>
      <p>
        {user.name} logged-in
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  );
}

export default LoggedUser;
