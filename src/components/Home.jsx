/* eslint-disable max-len */
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  Modal, Button, ButtonGroup, Form, Row, Col,
} from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import CardComponent from './Card.jsx';
import './Home.css';
import { categoryOptions } from '../utilities/activityForm.jsx';
import {
  AppContext,
  retrieveActivities,
  joinActivity,
  editActivity,
} from '../store.jsx';

export default function HomeComponent() {
  // set the current cookies (stored in the browser) in the cookies state
  const [cookies] = useCookies([]);
  const { store, dispatch } = useContext(AppContext);
  const { activities } = store;
  const [displayCardDetails, setdisplayCardDetails] = useState(false);
  const [editOrViewActivity, setEditOrViewActivity] = useState('VIEW');
  const [activityDetails, setActivityDetails] = useState({
    id: '',
    name: '',
    description: '',
    dateTime: '',
    totalNumOfParticipants: '',
    location: '',
    creatorId: '',
    creatorName: '',
    participants: [],
  });
  const [editedActivityDetails, setEditedActivityDetails] = useState({
    name: '', description: '', dateTime: new Date(), totalNumOfParticipants: '2', location: '', categoryId: '1', usualPrice: '0.00', discountedPrice: '0.00', percentageDiscount: '0.00',
  });

  // create a hook to use when the logic says to change components
  const history = useHistory();

  useEffect(() => {
    retrieveActivities(dispatch);
  }, []);

  // update the state that stores the details of a selected activity and show the modal
  // containing the activity's details
  const handleDisplay = (activity) => {
    setActivityDetails({
      ...activityDetails,
      id: activity.id,
      name: activity.name,
      description: activity.description,
      dateTime: activity.dateTime,
      totalNumOfParticipants: activity.totalNumOfParticipants,
      location: activity.location,
      creatorId: activity.creatorId,
      creatorName: activity.creator.name,
      participants: activity.users,
      usualPrice: activity.usualPrice,
      discountedPrice: activity.discountedPrice,
    });

    setdisplayCardDetails(true);
  };

  const handleDisplayClose = () => {
    // close the modal
    setdisplayCardDetails(false);
    // set the modal to show activity details next time it opens
    setEditOrViewActivity('VIEW');
  };

  // eslint-disable-next-line func-names
  const handleJoinActivity = (activityId) => function () {
    // make an axios get request to join an activity
    joinActivity(dispatch, activityId).then((result) => {
      // if there was an error redirect user to login
      if (result.error) {
        history.push('/login');
        return;
      }

      // take the user to the chat room of the activity
      history.push('/chats');
    });
  };

  // handle to display a form to edit an activity's details
  const handleEditActivityBtnClick = () => {
    setEditOrViewActivity('EDIT');

    // get the current details of the activity
    const {
      name, description, dateTime, totalNumOfParticipants, location, categoryId, usualPrice, discountedPrice,
    } = activityDetails;

    // calculate the percentage discount
    const percentageDiscount = Math.round(((Number(usualPrice) - Number(discountedPrice)) / Number(usualPrice)) * 10000) / 100;

    // set the state to fill up the form with the selected activity details
    setEditedActivityDetails({
      ...editedActivityDetails, name, description, dateTime, totalNumOfParticipants, location, categoryId, usualPrice, discountedPrice, percentageDiscount,
    });
  };

  // handle when user changes the usual price
  const handleUsualPriceChange = (e) => {
    // change the usual price to 2 decimal places
    const usualPrice = Math.round(Number(e.target.value) * 100) / 100;

    const percentageDiscount = Math.round(((Number(usualPrice) - Number(editedActivityDetails.discountedPrice)) / Number(usualPrice)) * 10000) / 100;

    setEditedActivityDetails({ ...editedActivityDetails, usualPrice, percentageDiscount });
  };

  // handle when user changes the discounted price
  const handleDiscountedPriceChange = (e) => {
    // change the discounted price to 2 decimal places
    const discountedPrice = Math.round(Number(e.target.value) * 100) / 100;

    const percentageDiscount = Math.round(((Number(editedActivityDetails.usualPrice) - Number(discountedPrice)) / Number(editedActivityDetails.usualPrice)) * 10000) / 100;

    setEditedActivityDetails({ ...editedActivityDetails, discountedPrice, percentageDiscount });
  };

  // handle when user changes the discount percentage
  const handlePercentageDiscountChange = (e) => {
    // change the percentage discounted to 2 decimal places
    const percentageDiscount = Math.round(Number(e.target.value) * 100) / 100;

    // calculate the new discounted price
    const discountedPrice = Math.round(Number(editedActivityDetails.usualPrice) * (1 - percentageDiscount / 100) * 100) / 100;

    setEditedActivityDetails({ ...editedActivityDetails, discountedPrice, percentageDiscount });
  };

  // handle when user clicks on the button to save edits to an activity
  const handleSaveChanges = () => {
    // make an axios put request to update an activity in the database
    editActivity(dispatch, editedActivityDetails).then((result) => {
      // if there was an error redirect user to login
      if (result.error) {
        history.push('/login');
        return;
      }

      // get the updated activity
      const { updatedActivity } = result;

      // update the activity details state with the changed fields
      setActivityDetails({
        ...activityDetails,
        id: updatedActivity.id,
        name: updatedActivity.name,
        description: updatedActivity.description,
        dateTime: updatedActivity.dateTime,
        totalNumOfParticipants: updatedActivity.totalNumOfParticipants,
        location: updatedActivity.location,
        usualPrice: updatedActivity.usualPrice,
        discountedPrice: updatedActivity.discountedPrice,
      });

      // display the modal that shows the activity details
      setEditOrViewActivity('VIEW');
    });
  };

  // function that returns a modal containing details of the selected activity
  const cardSelectionModal = () => {
    // get the userId from the browser cookie
    const userId = Number(cookies.userId);

    // if state is view, show activity details,
    // and show buttons based on the user's relation to the activity
    // if state is edit, show form to edit activity details

    if (editOrViewActivity === 'VIEW') {
      let userActionsButtons = '';
      // get the buttons based on the user's relation to the activity:
      // 1. user is the creator
      if (userId === activityDetails.creatorId) {
        userActionsButtons = (
          <>
            <Button variant="primary">Chat</Button>
            <Button variant="success" onClick={handleEditActivityBtnClick}>Edit</Button>
            <Button variant="danger">Delete</Button>
          </>
        );
      } else if (activityDetails.participants.find((el) => el.id === userId)) {
        // 2. user is a current participant and not the creator
        userActionsButtons = (
          <>
            <Button variant="primary">Chat</Button>
            <Button variant="danger">Leave</Button>
          </>
        );
      } else {
        // 3. user is a potential participant
        userActionsButtons = (
          <>
            <Button variant="success" onClick={handleJoinActivity(activityDetails.id)}> Join </Button>
          </>
        );
      }

      // return the modal
      return (
        <Modal show={displayCardDetails} onHide={handleDisplayClose}>
          <Modal.Header closeButton>
            <Modal.Title>{activityDetails.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Description:
            {' '}
            {activityDetails.description}
            <br />
            Location:
            {' '}
            {activityDetails.location}
            <br />
            Proposed Date:
            {' '}
            {moment(activityDetails.dateTime).format('ll')}
            <br />
            Participants:
            {' '}
            {`${activityDetails.participants.length}/${activityDetails.totalNumOfParticipants}`}
            <br />
            Event Organized By:
            {' '}
            {activityDetails.creatorName}
          </Modal.Body>
          <Modal.Footer>
            {userActionsButtons}
            <Button variant="secondary" onClick={handleDisplayClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }

    if (editOrViewActivity === 'EDIT') {
      const numOfParticipantsOptions = [];
      // set the minimum number of participants
      // to be the number of current participants in the activity
      const minimumNumOfParticipants = activityDetails.participants.length;
      for (let i = minimumNumOfParticipants; i < 11; i += 1) {
        numOfParticipantsOptions.push(<option key={i} value={i}>{i}</option>);
      }

      // return the form to edit activity details
      return (
        <Modal show={displayCardDetails} onHide={handleDisplayClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Activity</Modal.Title>
          </Modal.Header>
          <Modal.Body className="edit-activity-modal-body">
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Pick a fun name!" value={editedActivityDetails.name} onChange={(e) => setEditedActivityDetails({ ...editedActivityDetails, name: e.target.value })} />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control required type="text" value={editedActivityDetails.description} onChange={(e) => setEditedActivityDetails({ ...editedActivityDetails, description: e.target.value })} />
              </Form.Group>

              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control required type="text" value={editedActivityDetails.location} onChange={(e) => setEditedActivityDetails({ ...editedActivityDetails, location: e.target.value })} />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="usualPrice">
                    <Form.Label>Usual Price($)</Form.Label>
                    <Form.Control required type="number" value={editedActivityDetails.usualPrice} onChange={handleUsualPriceChange} />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="discountedPrice">
                    <Form.Label>Discounted Price($)</Form.Label>
                    <Form.Control required type="number" value={editedActivityDetails.discountedPrice} onChange={handleDiscountedPriceChange} />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="percentDiscount">
                    <Form.Label>Discount(%)</Form.Label>
                    <Form.Control required type="number" value={editedActivityDetails.percentageDiscount} onChange={handlePercentageDiscountChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control required as="select" value={editedActivityDetails.categoryId} onChange={(e) => setEditedActivityDetails({ ...editedActivityDetails, categoryId: e.target.value })}>
                      {categoryOptions}
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="totalNumOfParticipants">
                    <Form.Label>No. of Participants</Form.Label>
                    <Form.Control required as="select" value={editedActivityDetails.totalNumOfParticipants} onChange={(e) => setEditedActivityDetails({ ...editedActivityDetails, totalNumOfParticipants: e.target.value })}>
                      {numOfParticipantsOptions}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="dateTime">
                <Form.Label>Proposed Date and Time</Form.Label>
                <br />
                <DateTimePicker
                  onChange={(value) => setEditedActivityDetails({ ...editedActivityDetails, dateTime: value })}
                  value={new Date(editedActivityDetails.dateTime)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleSaveChanges}> Save Changes </Button>
            <Button variant="secondary" onClick={handleDisplayClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }

    // return an empty div so eslint will not throw error
    return <div />;
  };

  const activityDisplay = () => {
    const activityFeed = activities.map((activity) => (
      <div key={activity.id}>
        {console.log(activity)}
        <CardComponent
          title={activity.name}
          date={moment(activity.dateTime).format('ll')}
          location={activity.location}
          totalNumOfParticipants={activity.totalNumOfParticipants}
          usualPrice={activity.usualPrice}
          discountedPrice={activity.discountedPrice}
          participants={activity.users}
          onClick={() => { handleDisplay(activity); }}
        />
      </div>
    ));
    return activityFeed;
  };

  return (
    <div>
      <div className="container create-button-div">
        <Link to="/activities/new" className="btn btn-primary" role="button">Create New Activity</Link>
      </div>
      <div className="container container-div">
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">Feed</Button>
          <Button variant="secondary">Your Created Activities</Button>
          <Button variant="secondary">Your Joined Activities</Button>
        </ButtonGroup>
      </div>
      <br />
      <div className="container feed-container">
        {activityDisplay()}
        {cardSelectionModal()}
      </div>
    </div>
  );
}
