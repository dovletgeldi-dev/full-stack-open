import React from "react";
import PropTypes from 'prop-types'

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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export default LoginForm;
