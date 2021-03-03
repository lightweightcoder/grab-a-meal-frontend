import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import {
  Jumbotron,
  Spinner,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';
import ConversationList from './Messages/ConversationList.jsx';
import MessageList from './Messages/MessageList.jsx';
import './Messages/Message.css';
import firebase from '../Firebase.js';

export default function Messages() {
  // const location = useLocation();
  const [conversationTitles, setConversationTitles] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [name, setName] = useState('');
  // showLoading is necessary for the conversationTitle to load before getting the messages
  const [showLoading, setShowLoading] = useState(true);
  const [email, setEmail] = useState('');
  // Retrieval from FireBase: Activity Message Title
  const snapshotToTitleArray = (snapshot) => {
    const returnTitleArr = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnTitleArr.push(item);
    });
    // console.log(returnTitleArr);

    return returnTitleArr;
  };
  useEffect(() => {
    const fetchMessageTitleData = async () => {
      setEmail(localStorage.getItem('email'));
      firebase.database().ref('rooms/').on('value', (resp) => {
        // console.log(resp);
        // console.log(resp.val(), 'val');
        setConversationTitles([]);
        setConversationTitles(snapshotToTitleArray(resp));
        setShowLoading(false);
        const currentRoomName = snapshotToTitleArray(resp)[0].roomname;
        setRoomName(currentRoomName);
      });
    };
    fetchMessageTitleData();
  }, []);

  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        <ConversationList
          sendConversationsTitle={setConversationTitles}
          conversationTitles={conversationTitles}
          roomName={roomName}
          setRoomName={setRoomName}
          showLoading={showLoading}
        />
      </div>
      {showLoading ? <Spinner color="primary" />
        : (
          <>
            <div className="scrollable content">
              <MessageList
                conversationTitles={conversationTitles}
                setConversationsTitle={setConversationTitles}
                roomName={roomName}
                setRoomName={setRoomName}
                showLoading={showLoading}
                setShowLoading={setShowLoading}
              />
            </div>
          </>
        )}

      {/* add forRefresh to make the components render */}
      {/* <Router forceRefresh> */}
      {/* <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        /> */}
      {/* <Switch>
          <SecureRoute path="/messages"> */}
      {/* <RoomList /> */}
      {/* <ChatRoom /> */}
      {/* </SecureRoute> */}
      {/* <Route path="/login"> */}
      {/* <LoginComponent /> */}
      {/* </Route> */}
      {/* <SecureRoute path="/addroom"> */}
      {/* <AddRoom /> */}
      {/* </SecureRoute> */}
      {/* <SecureRoute path="/chatroom/:room"> */}
      {/* </SecureRoute> */}
      {/* </Switch> */}
      {/* </Router> */}
    </div>
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
