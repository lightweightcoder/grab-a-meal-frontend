import '../component-stylesheets/Login.css';
import React, { useState } from 'react';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('handle login');
  };

  return (
    <>
      <Form className="form">
        <Row className="justify-content-center">
          <Col xs={5} className="justify-content-center">
            <img src="./logo.png" alt="" className="img-fluid" />
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
