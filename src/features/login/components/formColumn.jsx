import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './columns.scss';

const FormColumn = ({
  onSubmitLogin,
  username,
  password,
  setUsername,
  setPassword,
  isSubmitDisabled,
}) => {
  return (
    <div className="login-page-form-column">
      <h1>Sign Up</h1>

      <form onSubmit={onSubmitLogin}>
        <TextField
          label="Username"
          name="username"
          autoFocus
          required
          variant="outlined"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          required
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={isSubmitDisabled} variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};

export default FormColumn;
