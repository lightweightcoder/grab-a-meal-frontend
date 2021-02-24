import React from 'react';
import Card from 'react-bootstrap/Card';
import './Card.css';

export default function CardComponent({
  title, date, location, onClick, totalNumParticipant,
}) {
  return (
    <div className="card-container">
      <Card>
        <Card.Header>
          <div className="row">
            <div className="col-5">
              <h5>
                Activity Name
                {' '}
                {title}
                {' '}
              </h5>
            </div>
            <div className="col-1 offset-5">
              <button type="button" className="btn-circle"> Join </button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            Date and Time
            {date}
            <br />
            Location
            {location}
          </Card.Title>
          <Card.Text>
            Number of Participants: 1 / 4
            {' '}
            {totalNumParticipant}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
