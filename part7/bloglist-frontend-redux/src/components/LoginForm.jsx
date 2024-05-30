import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { initialLogin } from "../redux/loginSlice";

function LoginForm() {
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
