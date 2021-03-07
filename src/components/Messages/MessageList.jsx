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
import Alert from 'react-bootstrap/Alert';
import MessageChat from './MessageChat.jsx';
import firebase from '../../Firebase.js';

import './Message.css';

export default function MessageList({
  conversationTitles, setConversationsTitles, showLoading, setShowLoading, roomName, setRoomName,
}) {
  // const [messages, setMessages] = useState([]);
  const [email, setEmail] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [name, setName] = useState('');
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
  const convoTitle = conversationTitles[0];

  function AlertDismissible() {
    const [show, setShow] = useState(true);

    return (
      <>
        <Alert show={show} variant="success">
          <Alert.Heading>Hows it going?!</Alert.Heading>
          <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
            lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
            fermentum.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Close me all!
            </Button>
          </div>
        </Alert>

        {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
      </>
    );
  }

  // const noActivityJoinedMessageJsx = () => (
  //   <div className="alert alert-info" role="alert">
  //     A simple info alert—check it out!
  //   </div>
  // );

  const retrieveMessagesTitle = () => {
    firebase.database().ref('messages/').orderByChild('roomname').equalTo(roomName)
      .on('value', (resp) => {
        console.log(resp);
        setChats([]);
        setChats(snapshotToArray(resp));
      });
  };

  useEffect(() => {
    setName(localStorage.getItem('name'));
    console.log('in use Effect of messageList');
    const fetchData = async () => {
      setEmail(localStorage.getItem('email'));
      setName(localStorage.getItem('name'));
      if (roomName === undefined) {
        console.log('inside undefined');
        // noActivityJoinedMessageJsx();
      } else {
        retrieveMessagesTitle();
      }
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
    chat.sentBy = name;
    const newMessage = firebase.database().ref('messages/').push();
    newMessage.set(chat);
    setNewChat({
      roomname: '', email: '', message: '', date: '', sentBy: name,
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
