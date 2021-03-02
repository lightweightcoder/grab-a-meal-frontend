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

export default function ConversationList() {
  const [name, setName] = useState('');
  const [conversationTitles, setConversationsTitle] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [chats, setChats] = useState([]);
  // const [email, setemail] = useState('');
  const [roomname, setRoomname] = useState('');
  const [newChat, setNewChat] = useState({
    roomname: '', email: '', message: '', date: '', type: '',
  });
  const history = useHistory();
  const { room } = useParams();
  // // function that extracts Firebase response to Array of Objects
  // const snapshotToArray = (snapshot) => {
  //   const returnArr = [];

  //   snapshot.forEach((childSnapshot) => {
  //     const item = childSnapshot.val();
  //     item.key = childSnapshot.key;
  //     returnArr.push(item);
  //   });
  //   console.log(returnArr);
  //   return returnArr;
  // };

  // // Retrieval from Firebase: Message Content
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setEmail(localStorage.getItem('email'));
  //     setRoomname(room);
  //     firebase.database().ref('chats/').orderByChild('roomname').equalTo(roomname)
  //       .on('value', (resp) => {
  //         setChats([]);
  //         setChats(snapshotToArray(resp));
  //       });
  //   };

  //   fetchData();
  // }, [room, roomname]);

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
        setConversationsTitle([]);
        setConversationsTitle(snapshotToTitleArray(resp));
        setShowLoading(false);
      });
    };
    const fetchMessageBodyData = async () => {
      setEmail(localStorage.getItem('email'));
      firebase.database().ref('chats/').on('value', (resp) => {
        const a = snapshotToTitleArray(resp);
        console.log(a);
      });
    };
    // fetchMessageTitleData();
    fetchMessageBodyData();
  }, []);

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
        {/* {convoListJsx()} */}
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
