import '../component-stylesheets/Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { BACKEND_URL } from '../store.jsx';
import firebase from '../Firebase.js';

export default function Login() {
  // create a hook to use when the logic says to change components
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidMessage, setInvalidMessage] = useState('');

  // Firebase stuff
  const [creds, setCreds] = useState({ email: '' });
  // const [showLoading, setShowLoading] = useState(false);
  const ref = firebase.database().ref('users/');

  const handleLogin = () => {
    console.log('handle login');

    ref.orderByChild('email').equalTo(creds.email).once('value', (snapshot) => {
      if (snapshot.exists()) {
        localStorage.setItem('email', creds.email);
        history.push('/roomlist');
        // setShowLoading(false);
      } else {
        const newUser = firebase.database().ref('users/').push();
        newUser.set(creds);
        localStorage.setItem('email', creds.email);
        history.push('/roomlist');
        // setShowLoading(false);
      }
    });
    axios.post(`${BACKEND_URL}/login`, { email, password }).then((result) => {
      // if validation failed for login, display validation message
      if (result.data.invalidMessage) {
        console.log('invalid login found');
        setInvalidMessage(result.data.invalidMessage);
      }

      // if user logged in successfully,
      if (result.data.loggedIn) {
        // take the user to home route
        history.push('/home');
      }
    });
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    e.persist();
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
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
