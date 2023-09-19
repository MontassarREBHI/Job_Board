import React, { useEffect } from "react";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store.js";
import { useNavigate } from "react-router-dom";
import "../../App.css"; // Import your custom styles
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const JobApply = () => {
  const job = useSelector((state: RootState) => state.job.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (!job.title) navigate("/");
  }, []);

  return (
    <>
      <Container className="job-apply-container">
        <Alert
          variant="warning"
          dismissible
          style={{
            margin: "2%",
          }}
        >
          <Alert.Heading>warning</Alert.Heading>
          <p>
            Avoid refreshing before completing your application not to lose your
            progress!
          </p>
        </Alert>

        <Row>
          <Col md={8}>
            <h1 className="position-title">{job.title}</h1>

            <img src={job.imageUrl} alt="Job" className="job-image img-fluid" />
          </Col>
          <Col md={4}>
            <Button
              variant="primary"
              className="apply-button"
              onClick={() => {
                navigate("/Application");
              }}
            >
              Apply for this position
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="section-title">Company Description</h4>
            <p className="company-description">{job.companyDesc}</p>
            <h4 className="section-title">Job Description</h4>
            <p className="job-description">{job.description}</p>
            <h4 className="section-title">Job Requirement</h4>
            <p className="job-requirement">{job.jobRequirement}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JobApply;
