import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Link,
  useHistory,
  useParams,
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

export default function ConversationList({
  conversationTitles, sendConversationTitles, value, onClick, roomName, setRoomName,
}) {
  // send data that contain enter conversations status to Firebase DB
  // const enterChatRoom = (roomname) => {
  //   // Welcome/Entry message for chat conversations. e.g "So and so joined the conversations"
  //   const chat = {
  //     roomname: '', email: '', message: '', date: '', type: '',
  //   };
  //   chat.roomname = roomname;
  //   chat.email = email;
  //   chat.date = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
  //   chat.message = `${email} enter the conversations `;
  //   chat.type = 'join';
  //   const newMessage = firebase.database().ref('chats/').push();
  //   newMessage.set(chat);
  //   // Retrieve roomusers table and query DB to find if user exist
  //   firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname)
  //     .on('value', (resp) => {
  //       let roomuser = [];
  //       roomuser = snapshotToTitleArray(resp);
  //       const user = roomuser.find((x) => x.email === email);
  //       if (user !== undefined) {
  //         const userRef = firebase.database().ref(`roomusers/${user.key}`);
  //         userRef.update({ status: 'online' });
  //       } else {
  //         const newroomuser = { roomname: '', email: '', status: '' };
  //         newroomuser.roomname = roomname;
  //         newroomuser.email = email;
  //         newroomuser.status = 'online';
  //         const newRoomUser = firebase.database().ref('roomusers/').push();
  //         newRoomUser.set(newroomuser);
  //       }
  //     });

  //   history.push(`/chatroom/${roomname}`);
  // };

  const convoListJsx = () => {
    const convoList = conversationTitles.map((convo, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={convo + i}>
        <ConversationListItem
          title={convo}
          value={i}
          roomName={roomName}
          setRoomName={setRoomName}
        />
      </div>
    ));
    return convoList;
  };
  return (
    <div>
      <div className="conversations-list">
        {convoListJsx()}
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
      </div>
    </div>
  );
}
