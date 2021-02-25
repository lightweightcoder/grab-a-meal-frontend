import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import '../component-stylesheets/CreateActivity.css';

import { categoryOptions, numOfParticipantsOptions } from '../utilities/activityForm.jsx';

// import all the appropriate functions
import {
  AppContext,
  createActivity,
} from '../store.jsx';

export default function CreateActivityComponent() {
  // initialize the data from the context provider to obtain the
  // state and dispatch function from the value attribute
  // of the provider Higher Order Component in store.jsx
  const { dispatch } = useContext(AppContext);
  // state to control create activity form inputs
  const [newActivity, setNewActivity] = useState({
    name: '', description: '', dateTime: new Date(), totalNumOfParticipants: '1', location: '', categoryId: '1',
  });

  // create a hook to use when the logic says to change components
  const history = useHistory();

  // handle when user clicks on the 'submit' button to create an activity
  const handleCreateActivity = () => {
    // make an axios post request to create an activity
    createActivity(dispatch, newActivity).then((result) => {
      // if there was an error redirect user to login
      if (result.error) {
        history.push('/login');
        return;
      }

      // take the user to the chat room of the newly created chat
      history.push('/chats');
    });
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-10 col-xl-8">
          <div className="create-activity-form-container">
            <h4 className="create-activity-heading">Create activity</h4>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Pick a fun name!" value={newActivity.name} onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })} />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control required type="text" placeholder="What is your activity about?" value={newActivity.description} onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })} />
              </Form.Group>

              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control required type="text" value={newActivity.location} onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })} />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control required as="select" value={newActivity.gender} onChange={(e) => setNewActivity({ ...newActivity, categoryId: e.target.value })}>
                      {categoryOptions}
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="totalNumOfParticipants">
                    <Form.Label>No. of Participants</Form.Label>
                    <Form.Control required as="select" value={newActivity.totalNumOfParticipants} onChange={(e) => setNewActivity({ ...newActivity, totalNumOfParticipants: e.target.value })}>
                      {numOfParticipantsOptions}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="dateTime">
                <Form.Label>Date and Time</Form.Label>
                <br />
                <DateTimePicker
                  onChange={(value) => setNewActivity({ ...newActivity, dateTime: value })}
                  value={newActivity.dateTime}
                />
              </Form.Group>

              <Button variant="success" className="btn-block" onClick={handleCreateActivity}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
