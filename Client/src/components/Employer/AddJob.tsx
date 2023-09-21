import {
  Button,
  FloatingLabel,
  Form,
  ProgressBar,
  Modal,
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";

const AddJob = () => {
  const [show, setShow] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [newJob, setNewJob] = useState({
    title: "",
    requirement: "",
    description: "",
    companyDesc: "",
    employerEmail: localStorage.getItem("email"),
    closureDate: "",
  });
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
    dialogText === "Job added successfully!" ? navigate("/dash") : null;
  };

  const submitOffer = () => {
    if (Object.values(newJob).every((value) => value !== "")) {
      axios.post("http://localhost:5000/job", newJob).then(() => {
        setDialogText("Job added successfully!");
        setShow(true);
      });
    } else {
      setDialogText("you need to fill all the fields!");
      setShow(true);
    }
  };

  const now = (Object.values(newJob).filter((e) => e !== "").length - 1) * 20;
  return (
    <div style={{ margin: "5%", height: "100%" }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{dialogText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ProgressBar
        now={now}
        label={`${now}%`}
        variant={now < 100 ? "warning" : "success"}
        animated
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
      <label>Select a deadline for applications:</label>
      <input
        className="d-block mb-4"
        type="date"
        value={newJob.closureDate}
        onChange={(e) =>
          setNewJob({
            ...newJob,
            closureDate: e.target.value,
          })
        }
      />
      <Button size="lg" onClick={submitOffer}>
        {" "}
        Publish your offre{" "}
      </Button>
    </div>
  );
};

export default AddJob;
