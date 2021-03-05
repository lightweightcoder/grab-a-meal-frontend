import React, { useContext, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './Card.css';

export default function CardComponent({
  title, date, location, onClick, totalNumOfParticipants, usualPrice, discountedPrice, participants, activityId, handleJoinActivity,
}) {
  // eslint-disable-next-line max-len
  const percentageDiscount = Number((((Number(usualPrice) - Number(discountedPrice)) / Number(usualPrice)) * 100).toFixed(2));

  const discountedPricePerPax = Number(Number(discountedPrice / totalNumOfParticipants).toFixed(2));
  const usualPricePerPax = Number(Number(usualPrice / totalNumOfParticipants).toFixed(2));

  return (
    <div className="card-container">
      <Card>
        <Card.Header>
          <div className="row">
            <div className="col-9">
              <h5>
                {title}
              </h5>
            </div>
            <div className="col-1 offset-1">
              <button type="button" className="btn-circle" onClick={handleJoinActivity(activityId)}> Join </button>
            </div>
          </div>
        </Card.Header>
        <Card.Body onClick={onClick}>
          <Row className="justify-content-between">
            <Col xs={6}>
              <Card.Title>
                {date}
                <br />
                {location}
              </Card.Title>
              <Card.Text>
                {`Number of Participants: ${participants.length}/${totalNumOfParticipants}`}
              </Card.Text>
            </Col>
            <Col xs={4}>
              <Card.Title>
                $/Pax
                <br />
                {discountedPricePerPax}
              </Card.Title>
              <Card.Text>
                <small>
                  {`U.P: $${usualPricePerPax} Save ${percentageDiscount}%`}
                </small>
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
