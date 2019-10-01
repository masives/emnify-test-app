import React, { useState } from 'react';
import axios from 'axios';
import sha1 from 'js-sha1';
import { withRouter } from 'react-router-dom';

import TextColumn from './components/textColumn';
import FormColumn from './components/formColumn';
import './LoginContainer.scss';

export const AUTH_TOKEN_KEY = 'authToken';

export const login = authToken => {
  // add token, enable logged in view and redirect
  axios.defaults.headers.common['authorization'] = `Bearer ${authToken}`;
  window.localStorage.setItem(AUTH_TOKEN_KEY, authToken);
};

const LoginContainer = ({ setAuthToken, history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  const isSubmitDisabled = !Boolean(username) || !Boolean(password);
  const clearError = () => {
    setHasError(false);
  };
  const onSubmitLogin = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://cdn.emnify.net/api/v1/authenticate',
        {
          username,
          password: sha1(password),
        },
      );
      const authToken = response.data.auth_token;
      login(authToken);
      // this set's the root level token that is used as a way to check if user is logged in
      setAuthToken(authToken);
      history.push('/');
    } catch (hasError) {
      setHasError(true);
    }
  };
  return (
    <div className="login-page">
      <TextColumn />
      <FormColumn
        onSubmitLogin={onSubmitLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        isSubmitDisabled={isSubmitDisabled}
        hasError={hasError}
        clearError={clearError}
      />
    </div>
  );
};

export default withRouter(LoginContainer);
