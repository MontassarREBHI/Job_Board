import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import profilePic from "../assets/icons8-customer-40.png";
import homeLogo from "../assets/icons8-home-page-40.png";
import dashBoardLogo from "../assets/icons8-dashboard-64.png";
import LogOut from "../assets/icons8-logout-48.png";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { userContext } from "../contexts/ContextProvider";
import { useState, useEffect, useContext } from "react";
// import profileLogo from "./path-to-profile-logo.png"; // Import your profile logo image

function NavBar(): JSX.Element {
  const { userInfo, loggedIn, setLoggedIn, setUserInfo } =
    useContext(userContext);

  const logOut = () => {
    return loggedIn === "false"
      ? null
      : signOut(auth)
          .then(() => {
            localStorage.removeItem("email");
            sessionStorage.removeItem("loggedIn");
            setLoggedIn("false");
            setUserInfo({
              _id: "",
              name: "",
              email: localStorage.getItem("email") || "",
              phone: "",
              role: "",
              address: "",
              title: "",
              linkedIn: "",
              CV: "",
            });
          })
          .catch((error) => {
            console.log(error);
          });
  };
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <Link to={userInfo?.role === "employer" ? "/dash" : "/"}>
            {userInfo?.role === "employer" ? "Dashboard" : "Home"}
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          {loggedIn !== "true" && (
            <Nav.Link>
              <Link to="/register">Sign up</Link>
            </Nav.Link>
          )}
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
                src={profilePic} // Use the imported profile logo image source
                alt="Profile Logo"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
            </Link>
          </Nav.Link>
          <img
            src={homeLogo}
            alt="home picture"
            style={{ width: "40px", height: "40px" }}
          />
          <img
            src={dashBoardLogo}
            alt="dashboard logo"
            style={{ width: "42px", height: "42px" }}
          />
          <img
            src={LogOut}
            alt="log out  logo"
            style={{ width: "42px", height: "42px" }}
          />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
