import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';
import moment from 'moment';
import CardComponent from './Card.jsx';
import './Home.css';
import CreateActivity from './CreateActivity.jsx';
import {
  AppContext,
  retrieveActivities,
} from '../store.jsx';

export default function HomeComponent() {
  const { store, dispatch } = useContext(AppContext);
  const { activities } = store;
  const [displayCardDetails, setdisplayCardDetails] = useState(false);
  const [activityDetails, setActivityDetails] = useState({
    name: '',
    description: '',
    dateTime: '',
    totalNumOfParticipants: '',
    location: '',
    creatorId: '',
  });
  useEffect(() => {
    retrieveActivities(dispatch);
  }, []);
  const handleDisplay = (activity) => {
    setActivityDetails({
      ...activityDetails,
      name: activity.name,
      description: activity.description,
      dateTime: activity.dateTime,
      totalNumOfParticipants: activity.totalNumOfParticipants,
      location: activity.location,
      creatorId: activity.creatorId,
    });
    setdisplayCardDetails(true);
  };
  const handleDisplayClose = () => {
    setdisplayCardDetails(false);
  };
  const cardSelectionModal = () => (
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
        Date:
        {' '}
        {moment(activityDetails.dateTime).format('ll')}
        <br />
        Participants:
        {' '}
        {activityDetails.totalNumOfParticipants}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success"> Join </Button>
        <Button variant="secondary" onClick={handleDisplayClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const activityDisplay = () => {
    const activityFeed = activities.map((activity) => (
      <div key={activity.id}>
        <CardComponent
          title={activity.name}
          date={moment(activity.dateTime).format('ll')}
          location={activity.location}
          totalNumParticipant={activity.totalNumOfParticipants}
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
