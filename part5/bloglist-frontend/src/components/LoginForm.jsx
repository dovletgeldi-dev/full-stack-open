import React from "react";

function LoginForm({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username:
        <input
          type="text"
          name="Username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        password:
        <input
          type="text"
          name="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
}

export default LoginForm;
