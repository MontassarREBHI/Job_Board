import { Button, Container, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from "../app/store.js";
import {Cloudinary} from "@cloudinary/url-gen";
const Application = () => {
    const job = useSelector((state: RootState) => state.job.value);

  return (
    <Container style={{marginTop:"5%"}}>
    <h1> Apply for : {job.title} </h1>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="enter your Full name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Country</Form.Label>
        <Form.Control type="text" placeholder="country" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Phone number</Form.Label>
        <Form.Control type="number" placeholder="phone number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Upload CV</Form.Label>
        <Form.Control type="file"  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    </Container>
  )
}

export default Application