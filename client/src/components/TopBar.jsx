import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const TopBar = () => {

  const navigate = useNavigate();
  // Retrieve the JWT token from session storage
  const jwtToken = sessionStorage.getItem('jsonwebtoken');
  const token = jwtDecode(jwtToken);
  console.log(token)


  const handleLogout = () => {
    // Redirect to the login page
    navigate('/');
    // Delete the token from session storage
    sessionStorage.removeItem('jsonwebtoken');

    
  };


  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/courses">Online school</Navbar.Brand>
          <Nav className="me-auto">
            {!token.isAdmin && <Nav.Link href="/myCourses">My courses</Nav.Link>}
          </Nav>

          <Nav.Link className="float-end">
            <button type="button"
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >Logout</button>
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  )
}

export default TopBar