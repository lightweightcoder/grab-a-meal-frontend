import React, { useEffect, useState } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import {
  Spinner,
  Button,
} from 'reactstrap';
import Alert from 'react-bootstrap/Alert';
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
  // showLoading is necessary for the conversationTitle to load before getting the messages
  const [showLoading, setShowLoading] = useState(true);
  const [lastMessage, setLastMessage] = useState('');
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
    let allChat;
    const fetchMessageTitleData = async () => {
      const userId = localStorage.getItem('userId');
      firebase.database().ref('rooms/').on('value', (resp) => {
        allChat = snapshotToTitleArray(resp);
        const titlePresent = [];
        allChat.forEach((chat) => {
          const userIdPresent = chat.activityUsers.users.includes(Number(userId));
          if (userIdPresent) {
            titlePresent.push(chat.roomname);
          }
          return titlePresent;
        });
        setConversationTitles(titlePresent);
        const currentRoomName = titlePresent[0];
        setRoomName(currentRoomName);
        setShowLoading(false);
      });
    };

    fetchMessageTitleData();
  }, []);

  function AlertDismissibleExample() {
    return (
      <Alert variant="danger" onClose={() => { window.location.href = 'home'; }} dismissible>
        <Alert.Heading>Oh it looks like You have no messages!</Alert.Heading>
        <p>
          Join or create an activity first!
        </p>
        <Button onClick={() => { window.location.href = 'home'; }}>Return to home</Button>
      </Alert>
    );
  }
  if (!roomName) {
    return (
      <AlertDismissibleExample />
    );
  }
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
                lastMessage={lastMessage}
                sendLastmessage={setLastMessage}
              />
            </div>
          </>
        )}
    </div>
  );
}
