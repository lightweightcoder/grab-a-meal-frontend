import React, { useState, useEffect } from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardSubtitle,
  Button,
  Form,
  InputGroup,
  Input,
  InputGroupAddon,
} from 'reactstrap';
import Moment from 'moment';
// import ScrollToBottom from 'react-scroll-to-bottom';
import firebase from '../Firebase.js';
import './Chatroom.css';

function ChatRoom() {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [email, setemail] = useState('');
  const [roomname, setRoomname] = useState('');
  const [newchat, setNewchat] = useState({
    roomname: '', email: '', message: '', date: '', type: '',
  });
  const history = useHistory();
  const { room } = useParams();

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

  // Add the useEffect function that loads the chats data from the Firebase realtime-database.
  useEffect(() => {
    const fetchData = async () => {
      setemail(localStorage.getItem('email'));
      setRoomname(room);
      firebase.database().ref('chats/').orderByChild('roomname').equalTo(roomname)
        .on('value', (resp) => {
          setChats([]);
          setChats(snapshotToArray(resp));
        });
    };

    fetchData();
  }, [room, roomname]);
  // loads the user's data from the Firebase realtime-database.
  useEffect(() => {
    const fetchData = async () => {
      setemail(localStorage.getItem('email'));
      setRoomname(room);
      firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname)
        .on('value', (resp2) => {
          setUsers([]);
          const roomusers = snapshotToArray(resp2);
          setUsers(roomusers.filter((x) => x.status === 'online'));
        });
    };

    fetchData();
  }, [room, roomname]);

  // function that sends new message from message form to firebase DB
  const submitMessage = (e) => {
    e.preventDefault();
    const chat = newchat;
    chat.roomname = roomname;
    chat.email = email;
    chat.date = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
    chat.type = 'message';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    setNewchat({
      roomname: '', email: '', message: '', date: '', type: '',
    });
  };
  // function to handle input changes
  const onChange = (e) => {
    e.persist();
    setNewchat({ ...newchat, [e.target.name]: e.target.value });
  };
  // function to exit chat room while updating status data to Firebase
  const exitChat = (e) => {
    const chat = {
      roomname: '', email: '', message: '', date: '', type: '',
    };
    chat.roomname = roomname;
    chat.email = email;
    chat.date = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
    chat.message = `${email} leave the room`;
    chat.type = 'exit';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);

    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname)
      .once('value', (resp) => {
        let roomuser = [];
        roomuser = snapshotToArray(resp);
        const user = roomuser.find((x) => x.email === email);
        if (user !== undefined) {
          const userRef = firebase.database().ref(`roomusers/${user.key}`);
          userRef.update({ status: 'offline' });
        }
      });

    history.goBack();
  };
  return (
    <div className="Container">
      <Container>
        <Row>
          <Col xs="4">
            <div>
              <Card className="UsersCard">
                <CardBody>
                  <CardSubtitle>
                    <Button variant="primary" type="button" onClick={() => { exitChat(); }}>
                      Exit Chat
                    </Button>
                  </CardSubtitle>
                </CardBody>
              </Card>
              {users.map((item, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <Card key={idx} className="UsersCard">
                  <CardBody>
                    <CardSubtitle>{item.email}</CardSubtitle>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Col>
          <Col xs="8">
            <div className="ChatContent">
              {chats.map((item, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={idx} className="MessageBox">
                  {item.type === 'join' || item.type === 'exit'
                    ? (
                      <div className="ChatStatus">
                        <span className="ChatDate">{item.date}</span>
                        <span className="ChatContentCenter">{item.message}</span>
                      </div>
                    )
                    : (
                      <div className="ChatMessage">
                        <div className={`${item.email === email ? 'RightBubble' : 'LeftBubble'}`}>
                          {item.email === email
                            ? <span className="MsgName">Me</span> : <span className="MsgName">{item.email}</span>}
                          <span className="MsgDate">
                            {' '}
                            at
                            {' '}
                            {item.date}
                          </span>
                          <p>{item.message}</p>
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
            <footer className="StickyFooter">
              <Form className="MessageForm" onSubmit={submitMessage}>
                <InputGroup>
                  <Input type="text" name="message" id="message" placeholder="Enter message here" value={newchat.message} onChange={onChange} />
                  <InputGroupAddon addonType="append">
                    <Button variant="primary" type="submit">Send</Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
            </footer>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ChatRoom;
