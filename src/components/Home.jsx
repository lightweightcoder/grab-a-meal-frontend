import React, { useContext, useState, useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import CardComponent from './Card.jsx';
import './Home.css';
import {
  AppContext,
  retrieveActivities,
} from '../store.jsx';

export default function HomeComponent() {
  const { store, dispatch } = useContext(AppContext);
  const { activities } = store;
  console.log(activities);
  useEffect(() => {
    retrieveActivities(dispatch);
  }, []);
  return (
    <div>
      <div className="container create-button-div">
        <Button variant="primary"> Create an activity</Button>
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
        <CardComponent />
        <CardComponent />
      </div>
    </div>
  );
}
