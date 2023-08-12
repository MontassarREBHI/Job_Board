import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from "../app/store.js";
import '../App.css'; // Import your custom styles

const JobApply = () => {
  const job = useSelector((state: RootState) => state.job.value);

  return (
    <Container className="job-apply-container">
      <Row>
        <Col md={8}>
          <h1 className="position-title">{job.title}</h1>
          <p className="job-code">Job Code: ##{(job.id * 100 * Math.random()).toFixed(0)}</p>
          <img src={job.imageUrl} alt="Job" className="job-image img-fluid" />
        </Col>
        <Col md={4}>
          <Button variant="primary" className="apply-button">Apply for this position</Button>
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
  );
}

export default JobApply;
