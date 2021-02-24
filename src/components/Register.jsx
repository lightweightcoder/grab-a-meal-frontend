/* eslint-disable max-len */
import '../component-stylesheets/Register.css';
import React, { useState } from 'react';
import axios from 'axios';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { BACKEND_URL } from '../store.jsx';

export default function Register() {
  const [formInputs, setformInputs] = useState({
    email: '', password: '', name: '', dateOfBirth: '', gender: 'male',
  });
  const [invalidMessage, setInvalidMessage] = useState('');
  const [validated, setValidated] = useState(false);

  // create a hook to use when the logic says to change components
  const history = useHistory();

  const handleRegister = (event) => {
    console.log('handle register');
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      // The event.stopPropagation() method stops the bubbling of an event to parent elements, preventing any parent event handlers from being executed (W3 schools).
      event.stopPropagation();
    }

    setValidated(true);

    axios.post(`${BACKEND_URL}/register`, formInputs).then((result) => {
      // if validation failed for registration, display validation message
      if (result.data.invalidMessage) {
        console.log('invalid registration');
        setInvalidMessage(result.data.invalidMessage);
      }

      // if user registered successfully,
      if (result.data.createdUser) {
        // take the user to home route
        history.push('/home');
      }
    });
  };

  return (
    <div className="registration-form-container">
      <Form className="registration-form" noValidate validated={validated} onSubmit={handleRegister}>
        <Row>
          <Col className="registration-form-headings">
            <h5>Registration</h5>
            <p className="registration-invalid-message">{invalidMessage}</p>
          </Col>
        </Row>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" placeholder="" value={formInputs.email} onChange={(e) => setformInputs({ ...formInputs, email: e.target.value })} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="" value={formInputs.password} onChange={(e) => setformInputs({ ...formInputs, password: e.target.value })} />
          <Form.Control.Feedback type="invalid">
            Required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control required type="text" placeholder="" value={formInputs.name} onChange={(e) => setformInputs({ ...formInputs, name: e.target.value })} />
          <Form.Control.Feedback type="invalid">
            Required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control required as="select" type="text" value={formInputs.gender} onChange={(e) => setformInputs({ ...formInputs, gender: e.target.value })}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="date-pf-birth">
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control required type="date" value={formInputs.dateOfBirth} onChange={(e) => setformInputs({ ...formInputs, dateOfBirth: e.target.value })} />
          <Form.Control.Feedback type="invalid">
            Required
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="success" className="btn-block" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}
