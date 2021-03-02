import React, { useState } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import {
  Alert,
  Jumbotron,
  Spinner,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import firebase from '../Firebase.js';

function AddRoom() {
  // Declare the required variable inside the main function body.
  const history = useHistory();
  const [room, setRoom] = useState({ roomname: '' });
  const [showLoading, setShowLoading] = useState(false);
  // if the rooms table exist in Firebase Database, it will just return, if not it will create.
  const ref = firebase.database().ref('rooms/');
  // Add a function to save the room data to the Firebase realtime-database.
  const save = (e) => {
    e.preventDefault();
    setShowLoading(true);
    ref.orderByChild('roomname').equalTo(room.roomname).once('value', (snapshot) => {
      if (snapshot.exists()) {
        return (
          <div>
            <Alert color="primary">
              Room name already exist!
            </Alert>
          </div>
        );
      }
      const newRoom = firebase.database().ref('rooms/').push();
      newRoom.set(room);
      history.goBack();
      setShowLoading(false);
      return (
        <>
        </>
      );
    });
  };
  // Add a function to handle the input value changes.
  const onChange = (e) => {
    e.persist();
    setRoom({ ...room, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {showLoading
            && <Spinner color="primary" />}
      <Jumbotron>
        <h2>Please enter new Room</h2>
        <Form onSubmit={save}>
          <FormGroup>
            <Label>Room Name</Label>
            <Input type="text" name="roomname" id="roomname" placeholder="Enter Room Name" value={room.roomname} onChange={onChange} />
          </FormGroup>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default AddRoom;
