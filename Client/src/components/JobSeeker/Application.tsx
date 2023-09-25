import { Button, Container, Form, ProgressBar, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store.js";
import { useState } from "react";
import moment from "moment";
import axios from "axios";
import CountrySelector from "../CountrySelector.js";
const Application = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [application, setApplication] = useState({
    email: "",
    fullName: "",
    country: "",
    phoneNumber: "",
    CV: "",
  });
  const [filePath, setFilePath] = useState<string>("");
  const job = useSelector((state: RootState) => state.job.value);
  const handleClose = () => {
    setShow(false);
    dialogText === "Application submitted successfully!" ||
    dialogText === "you already applied for this position"
      ? navigate("/")
      : null;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("jobID", job._id);
    formData.append("email", application.email);
    formData.append("fullName", application.fullName);
    formData.append("country", application.country);
    formData.append("applyDate", moment().format("L"));
    formData.append("phoneNumber", String(application.phoneNumber));
    if (application.CV) {
      formData.append("CV", application.CV);
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/job/cvs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setDialogText("Application submitted successfully!");
      setShow(true);
      setFilePath(response.data.path);
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data || "An error occurred.";
      setDialogText(errorMessage);
      setShow(true);
    }
  };
  const now = Object.values(application).filter((e) => e !== "").length * 20;
  return (
    <Container style={{ marginTop: "5%" }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{dialogText}</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            {dialogText === "Application submitted successfully!" ||
            dialogText === "you already applied for this position"
              ? "explore more opportunities"
              : "close"}
          </Button>
        </Modal.Footer>
      </Modal>
      <h1
        style={{ fontFamily: "serif", marginBottom: "2%", textAlign: "center" }}
      >
        Application form
      </h1>
      <ProgressBar
        now={now}
        label={`${now}%`}
        variant={now < 100 ? "warning" : "success"}
        animated
        style={{ marginBottom: "2%" }}
      />
      <h3 style={{ fontFamily: "serif", marginBottom: "2%" }}>
        {" "}
        Apply for {job.title} position
      </h3>

      <Form encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) =>
              setApplication({ ...application, email: e.target.value })
            }
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter your Full name"
            onChange={(e) =>
              setApplication({ ...application, fullName: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Country</Form.Label>
          {/* <Form.Control
            type="text"
            placeholder="country"
            onChange={(e) =>
              setApplication({ ...application, country: e.target.value })
            }
          /> */}
          <CountrySelector
            application={application}
            setApplication={setApplication}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="number"
            placeholder="phone number"
            onChange={(e) =>
              setApplication({
                ...application,
                phoneNumber: Number(e.target.value),
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Upload CV</Form.Label>
          <Form.Control
            name="CV"
            type="file"
            onChange={(e) =>
              setApplication({ ...application, CV: e.target.files[0] })
            }
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>
      </Form>
      {/* <img src="http://localhost:5000/uploads/" alt="Uploaded CV" /> */}
    </Container>
  );
};

export default Application;
