import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { initialLogin } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../redux/notificationSlice";
import { setTypeOfNotification } from "../redux/notificationTypeSlice";
import Notifications from "./Notifications";

function LoginForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const result = await dispatch(initialLogin({ username, password }));

    console.log(result);

    if (result) {
      setUsername("");
      setPassword("");
      navigate("/");
    } else {
      dispatch(setNotification(`wrong username or password`, 3000));
      dispatch(setTypeOfNotification(false));
    }
  };

  return (
    <div>
      <Notifications />
      <form onSubmit={handleLogin}>
        <h1>Blog App</h1>

        <div>
          username:
          <input
            data-testid="username"
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>
        <div>
          password:
          <input
            data-testid="password"
            type="text"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default LoginForm;
