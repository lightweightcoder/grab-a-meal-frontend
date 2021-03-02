import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Link,
  useHistory,
} from 'react-router-dom';
import {
  Jumbotron,
  Spinner,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';
import Moment from 'moment';
import firebase from '../../Firebase.js';
import ConversationListItem from './ListConversationItem.jsx';
// import Toolbar from '../Toolbar';
// import ToolbarButton from '../ToolbarButton';
// import ConversationSearch from '../ConversationSearch';

import './Message.css';

axios.defaults.withCredentials = false;

export default function ConversationList() {
  // const [conversations, setConversations] = useState({ list: [] });
  const [name, setName] = useState('');
  const [conversations, setConversations] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [email, setEmail] = useState('');
  const history = useHistory();

  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });
    console.log(returnArr);

    return returnArr;
  };
  useEffect(() => {
    const fetchData = async () => {
      setEmail(localStorage.getItem('email'));
      firebase.database().ref('rooms/').on('value', (resp) => {
        // console.log(resp);
        // console.log(resp.val(), 'val');
        setConversations([]);
        setConversations(snapshotToArray(resp));
        console.log(conversations);
        setShowLoading(false);
      });
    };

    fetchData();
  }, []);
  // send data that contain enter conversations status to Firebase DB
  const enterChatRoom = (roomname) => {
    // Welcome/Entry message for chat conversations. e.g "So and so joined the conversations"
    const chat = {
      roomname: '', email: '', message: '', date: '', type: '',
    };
    chat.roomname = roomname;
    chat.email = email;
    chat.date = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
    chat.message = `${email} enter the conversations `;
    chat.type = 'join';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    // Retrieve roomusers table and query DB to find if user exist
    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname)
      .on('value', (resp) => {
        let roomuser = [];
        roomuser = snapshotToArray(resp);
        const user = roomuser.find((x) => x.email === email);
        if (user !== undefined) {
          const userRef = firebase.database().ref(`roomusers/${user.key}`);
          userRef.update({ status: 'online' });
        } else {
          const newroomuser = { roomname: '', email: '', status: '' };
          newroomuser.roomname = roomname;
          newroomuser.email = email;
          newroomuser.status = 'online';
          const newRoomUser = firebase.database().ref('roomusers/').push();
          newRoomUser.set(newroomuser);
        }
      });

    history.push(`/chatroom/${roomname}`);
  };

  const convoListJsx = () => {
    const convoList = conversations.map((convo, i) => (
      <div key={convo.roomname}>
        <ConversationListItem
          title={convo.roomname}
        />
      </div>
    ));
    return convoList;
  };
  return (
    <div>
      {showLoading
            && <Spinner color="primary" />}
      <div className="conversations-list">
        {convoListJsx()}
        {}
        {/* <Toolbar
        title="Messenger"
        leftItems={[
          <ToolbarButton key="cog" icon="ion-ios-cog" />,
        ]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />,
        ]}
      /> */}
        {/* <ConversationSearch /> */}
        {
        // conversations.list.map((conversations) => (
          //   <ConversationListItem
          //     key={conversations.name}
          //     name={conversations.name}
          //     text={conversations.text}
          //     // photo={conversations.photo}
          //   />
          // ))
        }
      </div>
    </div>
  );
}
