import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
function App() {
  const isLoggedIn = false;
  return (
    <div className="App">
      <Router>
        <Switch>
          {isLoggedIn && (
            <Route path="/">
              <div>Home page</div>
            </Route>
          )}
          <Route path="/login">
            <div>Heres login page</div>
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
