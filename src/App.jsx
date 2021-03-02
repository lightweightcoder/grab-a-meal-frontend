import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import NavbarComponent from './components/NavBar.jsx';
import LoginComponent from './components/Login.jsx';
import RegistrationComponent from './components/Registration.jsx';
import HomeComponent from './components/Home.jsx';
import CreateActivityComponent from './components/CreateActivity.jsx';
import { AppProvider } from './store.jsx';
// import RoomList from './components/RoomList.jsx';
// import AddRoom from './components/AddRoom.jsx';
// import ChatRoom from './components/ChatRoom.jsx';
import Messages from './components/Messages.jsx';
import Messages2 from './components/Messages2.jsx';

function App() {
  // const location = useLocation();
  return (
    <>
      <AppProvider>
        <Router>
          <NavbarComponent />
          {/* <Redirect
            to={{
              pathname: '/roomlist',
              state: { from: location },
            }}
          /> */}
          <Switch>
            <Route path="/home" component={HomeComponent} />
            <Route path="/profile" component="" />
            <Route path="/messages" component={Messages} />
            <Route path="/messages2" component={Messages2} />
            <Route path="/logout" component="" />
            <Route path="/activities/new" component={CreateActivityComponent} />
            <Route path="/login">
              <LoginComponent />
            </Route>
            <Route path="/register" component={RegistrationComponent} />
            {/* <SecureRoute path="/roomlist">
              <RoomList />
            </SecureRoute>
            <SecureRoute path="/addroom">
              <AddRoom />
            </SecureRoute>
            <SecureRoute path="/chatroom/:room">
              <ChatRoom />
            </SecureRoute> */}
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
