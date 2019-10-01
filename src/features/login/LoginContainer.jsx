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

  const isSubmitDisabled = !Boolean(username) || !Boolean(password);

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
      setAuthToken(authToken);
      history.push('/');
    } catch (error) {
      // todo add error handling
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
      />
    </div>
  );
};

export default withRouter(LoginContainer);
