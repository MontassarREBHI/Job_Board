import { Link } from "react-router-dom";
import { UserContextType } from "../types";
import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ProfileIcon from "@mui/icons-material/AccountCircle";

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
    <div>
      <BottomNavigation
        sx={{ width: "100%", backgroundColor: "#DAE4E6" }}
        value={value}
        onChange={handleChange}
      >
        <Link to={userInfo?.role === "employer" ? "/dash" : "/"}>
          <BottomNavigationAction
            label={userInfo?.role === "employer" ? "Dashboard" : "Home"}
            value={userInfo?.role === "employer" ? "dashBoard" : "Home"}
            icon={
              userInfo?.role === "employer" ? <GridViewIcon /> : <HomeIcon />
            }
            sx={{ marginLeft: "0" }}
          />
        </Link>
        <Link to="/signin" onClick={logOut}>
          {loggedIn === "true" ? (
            <BottomNavigationAction
              sx={{ marginLeft: "35%" }}
              label="Logout"
              value="logOut"
              icon={<LogoutIcon />}
            />
          ) : (
            <BottomNavigationAction
              sx={{ marginLeft: "35%" }}
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
            className="ml-24"
          />
        </Link>
      </BottomNavigation>
    </div>
  );
}

export default NavBar;
