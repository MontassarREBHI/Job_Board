import React from 'react'
import { Container, Navbar,Nav } from "react-bootstrap";
import {Link} from 'react-router-dom'
function NavBar():JSX.Element {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home"><Link to="/">Home </Link></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home"><Link to="/register">Sign up</Link></Nav.Link>
            <Nav.Link href="#features"><Link to="/signin">Sign in </Link></Nav.Link> 
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavBar