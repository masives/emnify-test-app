import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <Router>
        <Switch>
          {isLoggedIn && (
            <Route path="/">
              <HomePage />
            </Route>
          )}
          <Route path="/login">
            <LoginPage setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
