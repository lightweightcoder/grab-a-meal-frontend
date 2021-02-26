import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import RoomList from './RoomList.jsx';
import AddRoom from './AddRoom.jsx';
import ChatRoom from './ChatRoom.jsx';

export default function Messages() {
  const location = useLocation();
  return (
    <div>
      <Router>
        <Redirect
          to={{
            pathname: '/roomlist',
            state: { from: location },
          }}
        />
        <Switch>
          <SecureRoute path="/roomlist">
            <RoomList />
          </SecureRoute>
          <SecureRoute path="/addroom">
            <AddRoom />
          </SecureRoute>
          <SecureRoute path="/chatroom/:room">
            <ChatRoom />
          </SecureRoute>
        </Switch>
      </Router>
    </div>
  );
}
function SecureRoute({ children, ...rest }) {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) => (localStorage.getItem('email') ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
}
