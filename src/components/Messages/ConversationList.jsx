import React from 'react';
import axios from 'axios';
// import firebase from '../../Firebase.js';
import ConversationListItem from './ListConversationItem.jsx';
// import Toolbar from '../Toolbar';
// import ToolbarButton from '../ToolbarButton';
// import ConversationSearch from '../ConversationSearch';

import '../../component-stylesheets/Message.css';

axios.defaults.withCredentials = false;

export default function ConversationList({
  conversationTitles, roomName, setRoomName,
}) {
  // const snapshotToArray = (snapshot) => {
  //   const returnArr = [];

  //   snapshot.forEach((childSnapshot) => {
  //     const item = childSnapshot.val();
  //     item.key = childSnapshot.key;
  //     returnArr.push(item);
  //   });

  //   return returnArr;
  // };

  const convoListJsx = () => {
    // let lastMessage;
    // const fetchLastMessageData = async ({ convo }) => {
    //   firebase.database().ref('messages/').orderByChild('roomname').on('value', (resp) => {
    //     console.log(snapshotToArray(resp)[0]);
    //     const messagesArray = snapshotToArray(resp);
    //     const roomMessageArray = [];
    //     messagesArray.forEach((room) => {
    //       roomMessageArray.push({ roomname: room.roomname, message: room.message });
    //     });
    //     lastMessage = roomMessageArray.filter((element) => element.roomname === convo).pop();
    //     console.log(lastMessage, 'hi');
    //   });
    // };
    const convoList = conversationTitles.map((convo, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={convo + i}>
        <fetchLastMessageData
          convo={convo}
        />
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
      </div>
    </div>
  );
}
