import { Link } from "react-router-dom";
import { UserContextType } from "../types";
import * as React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material/";
import logo from "../assets/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import { Row, Col } from "react-bootstrap";
import LoginIcon from "@mui/icons-material/Login";
import GridViewIcon from "@mui/icons-material/GridView";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { userContext } from "../contexts/ContextProvider";
import { useContext } from "react";
// import profileLogo from "./path-to-profile-logo.png"; // Import your profile logo image

function NavBar(): JSX.Element {
  const { userInfo, loggedIn, setLoggedIn, setUserInfo } =
    useContext<UserContextType>(userContext);
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
              photo: "",
              CV: "",
              about: "",
            });
          })
          .catch((error) => {
            console.log(error);
          });
  };
  return (
    <BottomNavigation
      className="Row"
      sx={{ width: "100%", backgroundColor: "#DAE4E6" }}
      value={value}
      onChange={handleChange}
    >
      <img
        src={logo}
        alt="logo"
        style={{ borderRadius: "50%", marginRight: "5%" }}
      />
      <Col xs={1} md={1} lg={1}>
        <Link to={userInfo?.role === "employer" ? "/dash" : "/"}>
          <BottomNavigationAction
            label={userInfo?.role === "employer" ? "Dashboard" : "Home"}
            value={userInfo?.role === "employer" ? "dashBoard" : "Home"}
            icon={
              userInfo?.role === "employer" ? <GridViewIcon /> : <HomeIcon />
            }
          />
        </Link>
      </Col>
      <Col xs={2} md={4} lg={6}></Col>
      <Col lg={3} md={4}>
        <Link to="/signin" onClick={logOut}>
          {loggedIn === "true" ? (
            <BottomNavigationAction
              label="Logout"
              value="logOut"
              icon={<LogoutIcon />}
            />
          ) : (
            <BottomNavigationAction
              label="Login"
              value="login"
              icon={<LoginIcon />}
            />
          )}
        </Link>

        <Link to="/profile">
          <BottomNavigationAction
            label="Profile"
            value="Profile"
            icon={<ProfileIcon />}
          />
        </Link>
      </Col>
    </BottomNavigation>
  );
}

export default NavBar;
