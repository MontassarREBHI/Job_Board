import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const registUser= async(event)=>{
    event.preventDefault()
    confirmPassword===password?
    createUserWithEmailAndPassword(auth , email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
      }):alert('retype password correctly')

  }
  return (
    <Container>
      <Form onSubmit={(e)=>registUser(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="re-type Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
        {/* <p onClick={()=>()}>sign in</p> */}
      </Form>

    </Container>
  );
};

export default Register;
