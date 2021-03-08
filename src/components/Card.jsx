import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './Card.css';

export default function CardComponent({
  date, location, onClick,
  totalNumOfParticipants, usualPrice, discountedPrice, participants,
}) {
  // eslint-disable-next-line max-len
  const percentageDiscount = Number((((Number(usualPrice) - Number(discountedPrice)) / Number(usualPrice)) * 100).toFixed(2));

  const discountedPricePerPax = Number(Number(discountedPrice / totalNumOfParticipants).toFixed(2));
  const usualPricePerPax = Number(Number(usualPrice / totalNumOfParticipants).toFixed(2));

  return (
    <div className="card-container">
      <Card>
        <Card.Body onClick={onClick}>
          <Row className="justify-content-between">
            <Col xs={7}>
              <Card.Title class="text-black-80">
                <strong>Date:</strong>
                {' '}
                {date}
                <br />
                <strong>Location:</strong>
                {' '}
                {location}
              </Card.Title>
              <Card.Text>
                <strong>No. of Participants:</strong>
                {`${participants.length}/${totalNumOfParticipants}`}
              </Card.Text>
            </Col>
            <Col xs={5}>
              <Card.Title class="text-black-80">
                $
                <strong>
                  {discountedPricePerPax}
                  {' '}
                  / person
                </strong>
              </Card.Title>
              <Card.Text>
                <small>
                  U.P: $
                  {`${usualPricePerPax}`}
                  <br />
                  <strong>
                    Save
                    {' '}
                    {`${percentageDiscount}%`}
                  </strong>
                </small>
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
        <Row onClick={onClick}>
          <Col className=" col-4 offset-9 text-black-70">
            <small>
              View Details
            </small>
          </Col>
        </Row>
        <div className="d-flex justify-content-end socials p-2 py-3">
          <i className="fa fa-thumbs-up" />
          <i className="fa fa-comments-o" />
          <i className="fa fa-share" />
        </div>
      </Card>
    </div>
  );
}
