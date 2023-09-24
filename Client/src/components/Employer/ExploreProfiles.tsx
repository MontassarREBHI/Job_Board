import { useState, useEffect } from "react";
import applicant from "../../types";
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
      })
      .catch((err) => console.log(err.message));
  }, []);
  const contactProfile = (email) => {
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;
  };
  return (
    <>
      <h1
        style={{
          margin: "2%",
          textAlign: "center",
          fontFamily: "times",
          borderStyle: "ridge",
        }}
      >
        List of profiles
      </h1>
      <Row className="mt-3">
        {applicants.map((e) => (
          <Col key={e._id} xl={3} sm={6}>
            <BasicProfileCard applicant={e} contactProfile={contactProfile} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ExploreProfiles;
