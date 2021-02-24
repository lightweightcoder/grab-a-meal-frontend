import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NavbarComponent from './components/NavBar.jsx';
import HomeComponent from './components/Home.jsx';
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
          </Switch>
        </Router>
      </AppProvider>
    </>
  );
}

export default App;
