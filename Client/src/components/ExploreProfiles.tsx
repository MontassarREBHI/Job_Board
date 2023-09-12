import React, { useState, useEffect } from "react";
import { applicant } from "../types";
import axios from "axios";
import linkedIn from "../assets/icons8-linkedin-48.png";
import mail from "../assets/icons8-email-48.png";
import { Button, Row, Col, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
    <Row style={{ margin: "1%" }}>
      {applicants.map((e) => (
        <Col xs={12} sm={6} md={4} lg={3} style={{ marginBottom: "2%" }}>
          <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
            <img
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/scan", { state: e })}
              className="h-15  rounded-t-lg object-cover md:h-40 md:!rounded-none md:!rounded-l-lg"
              src={
                e?.photo
                  ? e.photo
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
            />
            <div className="flex flex-col justify-start p-6">
              <h5
                className="mb-2 text-xl font-medium  text-neutral-800 dark:text-neutral-50"
                style={{ fontFamily: "serif" }}
              >
                Name: {e.name}
              </h5>
              <h5
                className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50"
                style={{ fontFamily: "serif" }}
              >
                Title: {e.title}
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                <Nav.Link
                  href={e.linkedIn}
                  target="_blank"
                  style={{ display: "flex" }}
                >
                  <img
                    src={linkedIn}
                    style={{ width: "35px", height: "35px" }}
                    alt=""
                  />
                </Nav.Link>
              </p>
              <img
                onClick={() => contactProfile(e.email)}
                src={mail}
                style={{ width: "35px", height: "35px", cursor: "pointer" }}
                alt=""
              />
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default ExploreProfiles;
