import React from 'react';
import '../component-stylesheets/NavBar.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { useCookies } from 'react-cookie';

export default function NavbarComponent() {
  // set the current cookies (stored in the browser) in the cookies state
  const [cookies] = useCookies([]);

  // if there is loggedInHash and userId in cookies, user is logged in
  if (cookies.userId && cookies.loggedInHash) {
    // display navbar for a logged in user
    return (
      <div className="navbar-container app-navbar">
        <Navbar bg="light" expand="lg">
          <LinkContainer to="/home">
            <Navbar.Brand>
              <img src="./logo.png" alt="" width="100px" height="80px" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/home">
                <Nav.Link>HomePage</Nav.Link>
              </LinkContainer>
              {/* <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer> */}
              <LinkContainer to="/messages">
                <Nav.Link>Messages</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/logout">
                <Nav.Link>Logout</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }

  // display navbar for a non-logged in user
  return (
    <div className="navbar-container app-navbar">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <img src="./logo.png" alt="" width="100px" height="80px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
