/* eslint-disable react-refresh/only-export-components */
import React, { useState,useEffect} from "react";
import axios from 'axios'
type UserType = {
    _id:string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  CV: string;
  // Add other properties as needed
};
const userContext = React.createContext<UserType | undefined>(undefined);

 const ContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [userInfo, setUserInfo] = useState<UserType>({
    _id:'',
    name: "",
    email: localStorage.getItem("email") || "",
    phone: "",
    role: "",
    address: "",
    CV: "",
  });
  

  return (
    <userContext.Provider value={{userInfo,setUserInfo}}>{children}</userContext.Provider>
  );
};

export { userContext, ContextProvider };
