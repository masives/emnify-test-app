import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { AUTH_TOKEN_KEY, login } from './features/login/LoginContainer';

const App = () => {
  // handle auth and token restoring
  const [authToken, setAuthToken] = useState(
    window.localStorage.getItem(AUTH_TOKEN_KEY),
  );
  useEffect(() => {
    if (authToken && authToken !== 'null') {
      login(authToken);
    }
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          {authToken && (
            <Route path="/">
              <HomePage />
            </Route>
          )}
          <Route path="/login">
            <LoginPage setAuthToken={setAuthToken} />
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
