import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NavbarComponent from './components/NavBar.jsx';
import HomePage from './components/HomePage.jsx';

function App() {
  return (
    <>
      <Router>
        <NavbarComponent />
        <Switch>
          <Route path="/home" component="" />
          <Route path="/profile" component="" />
          <Route path="/messages" component="" />
          <Route path="/logout" component="" />
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <div className="container">
          <p> hello world</p>
        </div>
      </Router>

    </>
  );
}

export default App;
