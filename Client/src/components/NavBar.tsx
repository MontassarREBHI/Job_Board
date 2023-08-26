import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
// import profileLogo from "./path-to-profile-logo.png"; // Import your profile logo image

function NavBar(): JSX.Element {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
          <Link to="/home">Home</Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">
            <Link to="/">Sign up</Link>
          </Nav.Link>
          <Nav.Link href="#features">
            <Link to="/signin">Sign in</Link>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#profile">
            <Link to="/profile">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" // Use the imported profile logo image source
                alt="Profile Logo"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
            </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
