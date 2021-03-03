import React, { useEffect, useState } from 'react';
import moment from 'moment';
// import Compose from '../Compose';
// import Toolbar from '../Toolbar';
// import ToolbarButton from '../ToolbarButton';
import {
  Link,
  useHistory,
  useParams,
} from 'react-router-dom';
import {
  InputGroup, InputGroupAddon, Button, Input, Form,
} from 'reactstrap';
import MessageChat from './MessageChat.jsx';
import firebase from '../../Firebase.js';

import './Message.css';

export default function MessageList({
  conversationTitles, setConversationsTitles, showLoading, setShowLoading, roomName, setRoomName,
}) {
  // const [messages, setMessages] = useState([]);
  const [email, setEmail] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState({
    roomname: '', email: '', message: '', date: '', type: '',
  });
  const history = useHistory();

  // function that extracts Firebase response to Array of Objects
  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });
    return returnArr;
  };
  // Retrieval from Firebase: Message Content
  const convoTitle = conversationTitles[0].roomname;
  useEffect(() => {
    const fetchData = async () => {
      setEmail(localStorage.getItem('email'));
      firebase.database().ref('chats/').orderByChild('roomname').equalTo(roomName)
        .on('value', (resp) => {
          setChats([]);
          setChats(snapshotToArray(resp));
          // setSenderEmail()
        });
    };

    fetchData();
  }, [roomName]);
  const onChange = (e) => {
    setNewChat({ ...newChat, [e.target.name]: e.target.value });
  };
  const submitMessage = (e) => {
    e.preventDefault();
    const chat = newChat;
    chat.roomname = roomName;
    chat.email = email;
    chat.date = moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
    chat.type = 'message';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    setNewChat({
      roomname: '', email: '', message: '', date: '', type: '',
    });
  };

  const renderMessages = () => {
    let i = 0;
    const messageCount = chats.length;
    const tempMessages = [];

    while (i < messageCount) {
      const currentEmail = chats[i].email;
      const previous = chats[i - 1];
      const current = chats[i];
      const next = chats[i + 1];
      const isMine = currentEmail === email;
      const currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        const previousMoment = moment(previous.timestamp);
        const previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        const nextMoment = moment(next.timestamp);
        const nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <MessageChat
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />,
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  };

  return (
    <div className="message-list">
      {/* <Toolbar
        title="Conversation Title"
        rightItems={[
          <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
          <ToolbarButton key="video" icon="ion-ios-videocam" />,
          <ToolbarButton key="phone" icon="ion-ios-call" />,
        ]} */}
      {/* /> */}

      <div className="message-list-container">{renderMessages()}</div>
      <div className="compose">
        <div className="col-12">
          <Form onSubmit={submitMessage}>
            <InputGroup>
              <Input
                type="text"
                name="message"
                className="compose-input"
                placeholder="Type a message..."
                value={newChat.message}
                onChange={onChange}
              />
              <InputGroupAddon addonType="append">
                <button className="toolbar-button" type="submit"> Send </button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>

  );
}
