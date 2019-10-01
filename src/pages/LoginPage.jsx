import React from 'react';
import LoginContainer from '../features/login/LoginContainer';

const LoginPage = ({ setAuthToken }) => {
  return <LoginContainer setAuthToken={setAuthToken} />;
};

export default LoginPage;
