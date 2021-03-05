import '../component-stylesheets/Login.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { BACKEND_URL, AppContext, setLoggedInUserIdAction } from '../store.jsx';
import firebase from '../Firebase.js';

export default function Login() {
  // set the current cookies (stored in the browser) in the cookies state
  const [cookies] = useCookies([]);
  // retrieve the store state variable and dispatch function from the App Context provider
  const { store, dispatch } = useContext(AppContext);
  // create a hook to use when the logic says to change components
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidMessage, setInvalidMessage] = useState('');

  // Firebase stuff
  const [creds, setCreds] = useState({ email: '' });
  // const [showLoading, setShowLoading] = useState(false);

  // if the user table exist in Firebase Database, it will just return, if not it will create.
  const ref = firebase.database().ref('users/');

  const handleLogin = () => {
    console.log('handle login');

    ref.orderByChild('email').equalTo(creds.email).once('value', (snapshot) => {
      if (snapshot.exists()) {
        localStorage.setItem('email', creds.email);
        history.push('/home');
        // setShowLoading(false);
      } else {
        const newUser = firebase.database().ref('users/').push();
        newUser.set(creds);
        localStorage.setItem('email', creds.email);
        history.push('/home');
        // setShowLoading(false);
      }
    });

    // make an axios post request to the backend database to find if the user exists
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

        // take the user to home route
        history.push('/home');
      }
    });
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    // e.persist(); we do not need this
    setCreds({ ...creds, [e.target.name]: e.target.value });
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
