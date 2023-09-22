/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { UserContextType, UserType } from "../types";
type ContextProviderProps = {
  children: ReactNode;
};
const userContext = React.createContext<UserContextType | undefined>(undefined);

const ContextProvider = ({ children }: ContextProviderProps) => {
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
    about: "",
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
