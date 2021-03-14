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
import Messages from './components/Messages.jsx';
import LandingPageComponent from './components/LandingPage.jsx';

function App() {
  return (
    <>
      <AppProvider>
        <Router>
          <NavbarComponent />
          <Switch>
            <Route path="/login" component={LoginComponent} />
            <Route path="/register" component={RegistrationComponent} />
            <Route path="/home" component={HomeComponent} />
            <Route path="/messages" component={Messages} />
            <Route path="/activities/new" component={CreateActivityComponent} />
            <Route path="/logout" component="" />
            <Route path="/" component={LandingPageComponent} />
          </Switch>
        </Router>
      </AppProvider>
    </>
  );
}

export default App;
