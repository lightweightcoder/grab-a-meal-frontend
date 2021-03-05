/* eslint-disable max-len */
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import '../component-stylesheets/CreateActivity.css';

import {
  categoryOptions, numOfParticipantsOptions, numToTwoDecimalPlace, getPercentageDiscount, getDiscountedPrice,
} from '../utilities/activityForm.jsx';

// import all the appropriate functions
import {
  AppContext,
  createActivity,
} from '../store.jsx';

export default function CreateActivityComponent() {
  // set the current cookies (stored in the browser) in the cookies state
  const [cookies] = useCookies([]);
  // initialize the data from the context provider to obtain the
  // state and dispatch function from the value attribute
  // of the provider Higher Order Component in store.jsx
  const { dispatch } = useContext(AppContext);
  // state to control create activity form inputs
  const [newActivity, setNewActivity] = useState({
    name: '', description: '', dateTime: new Date(), totalNumOfParticipants: '2', location: '', categoryId: '1', usualPrice: '0.00', discountedPrice: '0.00', percentageDiscount: '0.00',
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

  // handle when user changes the usual price
  const handleUsualPriceChange = (e) => {
    // change the usual price to 2 decimal places
    const usualPrice = numToTwoDecimalPlace(e.target.value);

    const percentageDiscount = getPercentageDiscount(usualPrice, newActivity.discountedPrice);

    setNewActivity({ ...newActivity, usualPrice, percentageDiscount });
  };

  // handle when user changes the discounted price
  const handleDiscountedPriceChange = (e) => {
    // change the discounted price to 2 decimal places
    const discountedPrice = numToTwoDecimalPlace(e.target.value);

    const percentageDiscount = getPercentageDiscount(newActivity.usualPrice, discountedPrice);

    setNewActivity({ ...newActivity, discountedPrice, percentageDiscount });
  };

  // handle when user changes the discount percentage
  const handlePercentageDiscountChange = (e) => {
    // change the percentage discounted to 2 decimal places
    const percentageDiscount = numToTwoDecimalPlace(e.target.value);

    // calculate the new discounted price
    const discountedPrice = getDiscountedPrice(newActivity.usualPrice, percentageDiscount);

    setNewActivity({ ...newActivity, discountedPrice, percentageDiscount });
  };

  // run this after component renders for the 1st time
  useEffect(() => {
    // if cookies has no userId, user is accessing this component illegally
    if (cookies.userId) {
      // redirect to login page
      history.push('/login');
    }
  }, []);

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
                  <Form.Group controlId="usualPrice">
                    <Form.Label>Usual Price($)</Form.Label>
                    <Form.Control required type="number" value={newActivity.usualPrice} onChange={handleUsualPriceChange} />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="discountedPrice">
                    <Form.Label>Discounted Price($)</Form.Label>
                    <Form.Control required type="number" value={newActivity.discountedPrice} onChange={handleDiscountedPriceChange} />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="percentDiscount">
                    <Form.Label>Discount(%)</Form.Label>
                    <Form.Control required type="number" value={newActivity.percentageDiscount} onChange={handlePercentageDiscountChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control required as="select" value={newActivity.categoryId} onChange={(e) => setNewActivity({ ...newActivity, categoryId: e.target.value })}>
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
                <Form.Label>Proposed Date and Time</Form.Label>
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
