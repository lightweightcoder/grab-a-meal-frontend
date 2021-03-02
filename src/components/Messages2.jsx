import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import LoginComponent from './Login.jsx';
import RoomList from './RoomList.jsx';
import AddRoom from './AddRoom.jsx';
import ChatRoom from './ChatRoom.jsx';
// import ConversationList from './Messages/ConversationList.jsx';
// import MessageList from './Messages/MessageList.jsx';
// import './Messages/Message.css';

export default function Messages2() {
  const location = useLocation();
  return (
    <>
      <RoomList />
      {/* <ChatRoom /> */}
    </>

  );
}
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
