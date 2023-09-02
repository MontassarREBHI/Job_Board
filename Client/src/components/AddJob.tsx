import { Button, FloatingLabel, Form, Nav, ProgressBar } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddJob = () => {
  const [newJob, setNewJob] = useState({
    title: "",
    requirement: "",
    description: "",
    companyDesc: "",
    employerEmail: localStorage.getItem("email"),
  });

  const submitOffer = () => {
    if (Object.values(newJob).every((value) => value !== "")) {
      axios
        .post("http://localhost:5000/job", newJob)
        .then(() => alert("Job added successfully!"));
    } else alert("you need to fill all the fields!");
  };
  const navigate = useNavigate();
  const now = Object.values(newJob).filter((e) => e !== "").length * 20;
  return (
    <div style={{ margin: "5%", height: "100%" }}>
      <ProgressBar
        now={now}
        label={`${now}%`}
        variant={now < 100 ? "warning" : "success"}
        style={{ marginBottom: "2%" }}
      />

      <FloatingLabel
        controlId="floatingTextarea"
        label="Company Description"
        className="mb-3"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          onChange={(e) => {
            setNewJob({ ...newJob, companyDesc: e.target.value });
          }}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingTextarea2"
        label="job description"
        className="mb-3"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
          onChange={(e) => {
            setNewJob({ ...newJob, description: e.target.value });
          }}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Job requirement"
        className="mb-3"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          onChange={(e) => {
            setNewJob({ ...newJob, requirement: e.target.value });
          }}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingTextarea2"
        label="job Title"
        className="mb-3"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
          onChange={(e) => {
            setNewJob({ ...newJob, title: e.target.value });
          }}
          required
        />
      </FloatingLabel>

      <Button size="lg" onClick={submitOffer}>
        {" "}
        Publish your offre{" "}
      </Button>
    </div>
  );
};

export default AddJob;
