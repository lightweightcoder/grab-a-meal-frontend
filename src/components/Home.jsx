import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
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
            <Button variant="success">Edit</Button>
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
            Date:
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
      // return the form to edit activity details
      return (
        <Modal show={displayCardDetails} onHide={handleDisplayClose}>
          <Modal.Header closeButton>
            <Modal.Title>{activityDetails.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Event Organized By:
            {' '}
            {activityDetails.creatorName}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleJoinActivity(activityDetails.id)}> Save Changes </Button>
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
