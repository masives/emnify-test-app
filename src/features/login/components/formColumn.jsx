import React from 'react';
import { Button, TextField } from '@material-ui/core';
import './columns.scss';

const FormColumn = ({
  onSubmitLogin,
  username,
  password,
  setUsername,
  setPassword,
  isSubmitDisabled,
  errorMessage,
  clearError,
}) => {
  return (
    <div className="login-page-form-column">
      <h1>Log in</h1>

      <form onSubmit={onSubmitLogin} error>
        <TextField
          label="Username"
          name="username"
          autoFocus
          required
          variant="outlined"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
            clearError();
          }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          required
          variant="outlined"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            clearError();
          }}
        />
        <p className="form-error-message">
          &nbsp; {Boolean(errorMessage) && errorMessage}
        </p>
        <Button type="submit" disabled={isSubmitDisabled} variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};

export default FormColumn;
