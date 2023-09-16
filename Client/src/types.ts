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
