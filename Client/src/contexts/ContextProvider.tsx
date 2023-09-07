/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import axios from "axios";
type UserType = {
  _id: string;
  photo: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  title: string;
  linkedIn: string;
  CV: string;
  // Add other properties as needed
};
const userContext = React.createContext<UserType | undefined>(undefined);

const ContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [userInfo, setUserInfo] = useState<UserType>({
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
  });
  const [loggedIn, setLoggedIn] = useState<string | null>(
    sessionStorage.getItem("loggedIn") || ""
  );
  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${userInfo.email}`)
      .then((res) => setUserInfo(res.data.user));
  }, []);

  return (
    <userContext.Provider
      value={{ userInfo, setUserInfo, loggedIn, setLoggedIn }}
    >
      {children}
    </userContext.Provider>
  );
};

export { userContext, ContextProvider };
