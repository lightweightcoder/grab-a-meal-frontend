import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';
import moment from 'moment';
import CardComponent from './Card.jsx';
import './Home.css';
import {
  AppContext,
  retrieveActivities,
  joinActivity,
} from '../store.jsx';

export default function HomeComponent() {
  const { store, dispatch } = useContext(AppContext);
  const { activities } = store;
  const [displayCardDetails, setdisplayCardDetails] = useState(false);
  const [activityDetails, setActivityDetails] = useState({
    id: '',
    name: '',
    description: '',
    dateTime: '',
    totalNumOfParticipants: '',
    location: '',
    creatorId: '',
    creatorName: '',
  });

  // create a hook to use when the logic says to change components
  const history = useHistory();

  useEffect(() => {
    retrieveActivities(dispatch);
  }, []);

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
    });
    setdisplayCardDetails(true);
  };

  const handleDisplayClose = () => {
    setdisplayCardDetails(false);
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
        <br />
        Event Organized By:
        {' '}
        {activityDetails.creatorName}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleJoinActivity(activityDetails.id)}> Join </Button>
        <Button variant="secondary" onClick={handleDisplayClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

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
