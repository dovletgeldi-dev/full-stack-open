import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../redux/notificationSlice";
import { setTypeOfNotification } from "../redux/notificationTypeSlice";
import { initialLogin, setLogin } from "../redux/loginSlice";

function LoginForm() {
  const user = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(initialLogin({ username, password }));
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleLogin}>
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
  );
}

export default LoginForm;
