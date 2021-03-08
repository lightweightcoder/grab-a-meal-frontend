import moment from 'moment';
import firebase from '../Firebase.js';

// this function adds a message when a user clicks join or creates an activity
const exitMessage = (currentRoomName, email, userName) => {
  // defining the message that will be sent to firebase
  const message = {
    roomname: '', email: '', message: '', date: '',
  };
  // using the parameters to set the message to be sent to firebase
  message.roomname = currentRoomName;
  message.email = email;
  message.date = moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
  message.message = `${userName} left the ${currentRoomName} `;
  // creating a new message in the firebase database with .push
  const newMessage = firebase.database().ref('messages/').push();
  // setting the message in firebase with the message from params
  newMessage.set(message);
};

// exporting the helper function to use in leave activity
export default exitMessage;
