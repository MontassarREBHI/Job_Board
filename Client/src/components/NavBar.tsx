import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { userContext } from "../contexts/ContextProvider";
import { useState, useEffect, useContext } from "react";
// import profileLogo from "./path-to-profile-logo.png"; // Import your profile logo image

function NavBar(): JSX.Element {
  const { loggedIn, setLoggedIn } = useContext(userContext);

  const logOut = () => {
    return loggedIn === "false"
      ? null
      : signOut(auth)
          .then(() => {
            localStorage.removeItem("email");
            sessionStorage.removeItem("loggedIn");
            setLoggedIn("false");
          })
          .catch((error) => {
            console.log(error);
          });
  };
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/home">Home</Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="/">Sign up</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/signin" onClick={logOut}>
              Sign {loggedIn === "true" ? "out" : "in"}
            </Link>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>
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
