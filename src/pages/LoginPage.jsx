import React from 'react';
import LoginContainer from '../features/login/LoginContainer';

const LoginPage = ({ setIsLoggedIn }) => {
  return <LoginContainer setIsLoggedIn={setIsLoggedIn} />;
};

export default LoginPage;
