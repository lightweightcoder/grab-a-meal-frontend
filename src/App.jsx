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

function App() {
  // const location = useLocation();
  return (
    <>
      <AppProvider>
        <Router>
          <NavbarComponent />
          <Switch>
            <Route path="/home" component={HomeComponent} />
            <Route path="/profile" component="" />
            <Route path="/messages" component={Messages} />
            <Route path="/logout" component="" />
            <Route path="/activities/new" component={CreateActivityComponent} />
            <Route path="/login" component={LoginComponent} />
            <Route path="/register" component={RegistrationComponent} />
          </Switch>
        </Router>
      </AppProvider>
    </>
  );
}

export default App;
// function SecureRoute({ children, ...rest }) {
//   return (
//     <Route
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       {...rest}
//       render={({ location }) => (localStorage.getItem('email') ? (
//         children
//       ) : (
//         <Redirect
//           to={{
//             pathname: '/login',
//             state: { from: location },
//           }}
//         />
//       ))}
//     />
//   );
// }
