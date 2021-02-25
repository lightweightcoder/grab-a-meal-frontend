import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import CardComponent from './Card.jsx';
import './Home.css';
import {
  AppContext,
  retrieveActivities,
} from '../store.jsx';

export default function HomeComponent() {
  const { store, dispatch } = useContext(AppContext);
  const { activities } = store;
  // console.log(activities[0].name);
  useEffect(() => {
    retrieveActivities(dispatch);
  }, []);

  const activityDisplay = () => {
    const activityFeed = activities.map((activity) => (
      <div key={activity.id}>
        {console.log(activity)}
        <CardComponent
          title={activity.name}
          date={moment(activity.dateTime).format('ll')}
          location={activity.location}
          totalNumParticipant={activity.totalNumOfParticipants}
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
      </div>
    </div>
  );
}
