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
import HomeComponent from './components/Home.jsx';
import CreateActivityComponent from './components/CreateActivity.jsx';
import { AppProvider } from './store.jsx';

function App() {
  return (
    <>
      <AppProvider>
        <Router>
          <NavbarComponent />
          <Switch>
            <Route path="/home" component={HomeComponent} />
            <Route path="/profile" component="" />
            <Route path="/messages" component="" />
            <Route path="/logout" component="" />
            <Route path="/login" component={LoginComponent} />
            <Route path="/register" component={RegistrationComponent} />
            <Route path="/activities/new" component={CreateActivityComponent} />
          </Switch>
        </Router>
      </AppProvider>
    </>
  );
}

export default App;
