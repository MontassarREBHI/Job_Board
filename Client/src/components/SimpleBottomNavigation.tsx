import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LoginIcon from "@mui/icons-material/Login";
// import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ProfileIcon from "@mui/icons-material/AccountCircle";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      <BottomNavigationAction label="Home" value="Home" icon={<HomeIcon />} />

      {/* <BottomNavigationAction
        label="Login"
        value="login"
        icon={<LoginIcon />}
      />
      <BottomNavigationAction
        label="Folder"
        value="folder"
        icon={<LoginIcon />}
      /> */}
      {/* <BottomNavigationAction
        label="Folder"
        value="folder"
        icon={<LogoutIcon />}
      /> */}

      <BottomNavigationAction
        label="Profile"
        value="Profile"
        icon={<ProfileIcon />}
      />
    </BottomNavigation>
  );
}
