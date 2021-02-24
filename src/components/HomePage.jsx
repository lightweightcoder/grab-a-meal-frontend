import React, { useState } from 'react';
import {
  Form, Button,
} from 'react-bootstrap';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-6 col-xl-5">
            <h4>
              <img src="./logo.png" alt="" className="img-fluid" />
            </h4>
          </div>
          <div className="col-12 col-md-6 col-xl-5 d-flex justify-content-center">
            <Form>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>

              <Button variant="success" onClick={handleLogin}>
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
