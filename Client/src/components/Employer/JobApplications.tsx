import { RootState } from "../../app/store.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Form, Button, Row, Col, Alert, Nav } from "react-bootstrap";

export default function JobApplications() {
  const [applications, setApplicantions] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [alert, setAlert] = useState(false);
  const job = useSelector((state: RootState) => state.job.value);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/job/applications/${job._id}`)
      .then((res) => {
        setApplicantions(res.data.applicationToThisJob);
      });
  }, []);
  const handleStatus = async (e, id: string) => {
    e.preventDefault();
    await axios
      .put("http://localhost:5000/job", { id: id, status: newStatus })
      .then((res) => console.log(res.data))
      .catch((err) => err.message);
    setAlert(true);
  };
  return (
    <div style={{ margin: "4%" }}>
      <Nav.Link
        as={Link}
        to="/dash"
        style={{ marginBottom: "2%", color: "blue" }}
      >
        Back to Dashboard ↺
      </Nav.Link>
      {alert && (
        <Alert variant="success" onClose={() => setAlert(false)} dismissible>
          status updated, applicant will be notified via email
        </Alert>
      )}

      <h2 style={{ textAlign: "center", marginBottom: "2%" }}>
        List of applicants to the post of {job.title}
      </h2>
      <div style={{ margin: "2%" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>email</th>
              <th>Phone Number</th>
              <th>Country</th>
              <th>application date</th>
              <th>CV link</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, i) => {
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{application.fullName}</td>
                  <td>{application.email}</td>
                  <td>{application.phoneNumber}</td>
                  <td>{application.country}</td>
                  <td>{application.applyDate}</td>
                  <td>
                    <a
                      href={`http://localhost:5000/uploads/${application.CV}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {application.CV}
                    </a>
                  </td>
                  <td>
                    <Row>
                      <Col xs={8}>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e) => setNewStatus(e.target.value)}
                          defaultValue={application.status}
                        >
                          <option value="pending">pending</option>
                          <option value="rejected">rejected</option>
                          <option value="accepted">accepted</option>
                        </Form.Select>
                      </Col>
                      <Col xs={4}>
                        <Button
                          onClick={(e) => {
                            handleStatus(e, application._id);
                          }}
                        >
                          save
                        </Button>
                      </Col>
                    </Row>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
