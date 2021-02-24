import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NavbarComponent from './components/NavBar.jsx';
import Login from './components/Login.jsx';

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
          <Route path="/login" component={Login} />
          <Route path="/" />
        </Switch>
        <div className="container">
          <p> hello world</p>
        </div>
      </Router>

    </>
  );
}

export default App;
