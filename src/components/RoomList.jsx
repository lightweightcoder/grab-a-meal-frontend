import React, { useState, useEffect } from 'react';
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
import firebase from '../Firebase.js';

function RoomList() {
  const [room, setRoom] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [email, setEmail] = useState('');
  const history = useHistory();
  // helper function that returns back data to our app
  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  };
  useEffect(() => {
    const fetchData = async () => {
      setEmail(localStorage.getItem('email'));
      firebase.database().ref('rooms/').on('value', (resp) => {
        console.log(resp);
        console.log(resp.val(), 'val');
        setRoom([]);
        setRoom(snapshotToArray(resp));
        console.log(room);
        setShowLoading(false);
      });
    };

    fetchData();
  }, []);

  // send data that contain enter room status to Firebase DB
  const enterChatRoom = (roomname) => {
    // Welcome/Entry message for chat room. e.g "So and so joined the room"
    const chat = {
      roomname: '', email: '', message: '', date: '', type: '',
    };
    chat.roomname = roomname;
    chat.email = email;
    chat.date = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
    chat.message = `${email} enter the room `;
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
  const logout = () => {
    localStorage.removeItem('email');
    history.push('/login');
  };
  return (
    <div>
      {showLoading
            && <Spinner color="primary" />}
      <Jumbotron>
        <h3>
          {email}
          {' '}
          <Button onClick={() => { logout(); }}>Logout</Button>
        </h3>
        <h2>Room List</h2>
        <div>
          <Link to="/addroom">Add Room</Link>
        </div>
        <ListGroup>
          {room.map((item, idx) => (
            <ListGroupItem
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              action
              onClick={() => { enterChatRoom(item.roomname); }}
            >
              {item.roomname}

            </ListGroupItem>
          ))}
        </ListGroup>
      </Jumbotron>
    </div>
  );
}

export default RoomList;
