import '../component-stylesheets/Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { BACKEND_URL } from '../store.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidMessage, setInvalidMessage] = useState('');

  // create a hook to use when the logic says to change components
  const history = useHistory();

  const handleLogin = () => {
    console.log('handle login');

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

  return (
    <>
      <Form className="form">
        <Row className="justify-content-center">
          <Col xs={5} className="justify-content-center">
            <img src="./logo.png" alt="" className="img-fluid" />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <p className="invalid-message">{invalidMessage}</p>
          </Col>
        </Row>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
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
