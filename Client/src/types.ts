export default interface applicant {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  CV: string;
  linkedIn: string;
  title: string;
  photo: string;
  about: string;
}

export interface Position {
  _id: string;
  title: string;
  companyDesc: string;
  employerEmail: string;
  requirement: string;
  description: string;
  closureDate: Date;
}
export type UserType = {
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
  about: string;
  // Add other properties as needed
};
export type UserContextType = {
  userInfo: UserType;
  setUserInfo: React.Dispatch<React.SetStateAction<UserType>>;
  loggedIn: string | null;
  setLoggedIn: React.Dispatch<React.SetStateAction<string | null>>;
};
