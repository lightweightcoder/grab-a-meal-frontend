import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import '../component-stylesheets/Login.css';
import { BACKEND_URL, AppContext, setLoggedInUserIdAction } from '../store.jsx';
import firebase from '../Firebase.js';

export default function Login() {
  // set the current cookies (stored in the browser) in the cookies state
  const [cookies] = useCookies([]);
  // retrieve the store state variable and dispatch function from the App Context provider
  const { dispatch } = useContext(AppContext);
  // useHistory to goBack to previous page when using react router
  const history = useHistory();

  // declaring state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidMessage, setInvalidMessage] = useState('');

  // if the user table exist in Firebase Database, it will just return, if not it will create.
  const ref = firebase.database().ref('users/');

  const handleLogin = () => {
    // post request to axios backend
    axios.post(`${BACKEND_URL}/login`, { email, password }, { withCredentials: true }).then((result) => {
      // if validation failed for login, display validation message
      if (result.data.invalidMessage) {
        console.log('invalid login found');
        setInvalidMessage(result.data.invalidMessage);
      }

      // if user logged in successfully,
      if (result.data.userId) {
        // set the logged in user's id in the app provider
        dispatch(setLoggedInUserIdAction(result.data.userId));
        // using the result from Axios to set the local storage item
        const userIdData = result.data.userId;
        const userNameData = result.data.userName;
        // Firebase query
        ref.orderByChild('email').equalTo(email).once('value', (snapshot) => {
          // if user is present, set localStorage to hold the values of email, name and userId
          if (snapshot.exists()) {
            localStorage.setItem('email', email);
            localStorage.setItem('name', userNameData);
            localStorage.setItem('userId', userIdData);
            // take the user to home route
            history.push('/home');
          } else {
            /* create a new using in the firebase database and set localStorage
            to hold the values of email, name and userId */
            // create a new user
            const newUser = firebase.database().ref('users/').push();
            // set the new user Information to firebase
            newUser.set({ name: userNameData, userid: userIdData, email });
            localStorage.setItem('name', userNameData);
            localStorage.setItem('userId', userIdData);
            localStorage.setItem('email', email);

            // take the user to home route
            history.push('/home');
          }
        });
      }
    }); };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    // if cookies has a userId, user is logged in
    if (cookies.userId) {
      // redirect to home page
      history.push('/home');
    }
  }, []);

  return (
    <>
      <Form className="login-form">
        <Row className="justify-content-center">
          <Col xs={5} className="justify-content-center">
            <img src="./logo.png" alt="" className="img-fluid" />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <p className="login-invalid-message">{invalidMessage}</p>
          </Col>
        </Row>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="" value={email} onChange={onEmailChange} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="success" className="btn-block" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </>
  );
}
