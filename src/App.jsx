import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NavbarComponent from './components/NavBar.jsx';
import LoginComponent from './components/Login.jsx';
import RegistrationComponent from './components/Registration.jsx';

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
          <Route path="/login" component={LoginComponent} />
          <Route path="/register" component={RegistrationComponent} />
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
