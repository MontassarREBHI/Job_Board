import { Button, Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../app/store.js";
import { useState } from "react";
import axios from "axios";
const Application = () => {
  const [application, setApplication] = useState({
    email: "",
    fullName: "",
    country: "",
    phoneNumber: 0,
    CV: null,
  });
  const job = useSelector((state: RootState) => state.job.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", application.email);
    formData.append("fullName", application.fullName);
    formData.append("country", application.country);
    formData.append("phoneNumber", String(application.phoneNumber));
    if (application.CV) {
      formData.append("CV", application.CV);
    }
    try {
      const response = await axios.post("your_backend_endpoint", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container style={{ marginTop: "5%" }}>
      <h1> Apply for : {job.title} </h1>
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
          <Form.Control
            type="text"
            placeholder="country"
            onChange={(e) =>
              setApplication({ ...application, country: e.target.value })
            }
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
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Application;
