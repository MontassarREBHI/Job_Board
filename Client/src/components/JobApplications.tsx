import { RootState } from "../app/store.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Form } from "react-bootstrap";

export default function JobApplications() {
  const [applications, setApplicantions] = useState([]);
  const job = useSelector((state: RootState) => state.job.value);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/job/applications/${job._id}`)
      .then((res) => {
        setApplicantions(res.data.applicationToThisJob);
      });
  }, []);
  const handleStatus = (e, id: string) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/job", { id: id, status: e.target.value })
      .then((res) => console.log(res.data.message))
      .catch((err) => err.message);
  };
  return (
    <div style={{ marginTop: "2%" }}>
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
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => handleStatus(e, application._id)}
                    >
                      <option value="pending">pending</option>
                      <option value="rejected">rejected</option>
                      <option value="accepted">accepted</option>
                    </Form.Select>{" "}
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
