import { useState, useEffect } from "react";
import applicant from "../types";
import axios from "axios";
// import linkedIn from "../assets/icons8-linkedin-48.png";
// import mail from "../assets/icons8-email-48.png";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BasicProfileCard from "./BasicProfileCard";
const ExploreProfiles = () => {
  const [applicants, setApplicants] = useState<applicant[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/user")
      .then((res) => {
        setApplicants(res.data.applicants);
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  const contactProfile = (email) => {
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;
  };
  return (
    <Row>
      {applicants.map((e) => (
        <Col key={e._id} xs={3}>
          <BasicProfileCard applicant={e} />
        </Col>
      ))}
    </Row>
  );
};

export default ExploreProfiles;
