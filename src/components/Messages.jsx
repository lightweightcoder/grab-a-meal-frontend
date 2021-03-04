import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';
import {
  Jumbotron,
  Spinner,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';
import { useCookies } from 'react-cookie';
import ConversationList from './Messages/ConversationList.jsx';
import MessageList from './Messages/MessageList.jsx';
import './Messages/Message.css';
import firebase from '../Firebase.js';

export default function Messages() {
  // set the current cookies (stored in the browser) in the cookies state
  const [cookies] = useCookies([]);
  // const location = useLocation();
  const [conversationTitles, setConversationTitles] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState(null);
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
  // create a hook to use when the logic says to change components
  const history = useHistory();

  useEffect(() => {
    if (!cookies.userId) {
      // if user is not logged in redirect to login page
      history.push('/login');
    }
    const fetchMessageTitleData = async () => {
      setEmail(localStorage.getItem('email'));
      setName(localStorage.getItem('name'));
      setUserId(localStorage.getItem('userId'));
      firebase.database().ref('rooms/').orderByChild('userid').equalTo(userId)
        .on('value', (resp) => {
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
              {/* <MessageList
                conversationTitles={conversationTitles}
                setConversationsTitle={setConversationTitles}
                roomName={roomName}
                setRoomName={setRoomName}
                showLoading={showLoading}
                setShowLoading={setShowLoading}
              /> */}
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
