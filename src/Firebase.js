import firebase from 'firebase';

const config = {
  projectId: 'hangoutchat-842be',
  apiKey: 'YOUR_API_KEY',
  databaseURL: 'https://hangoutchat-842be-default-rtdb.firebaseio.com',
};
firebase.initializeApp(config);

export default firebase;
