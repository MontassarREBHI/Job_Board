import React,{useState} from 'react'
import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../config/firebaseConfig'
import { Container, Form, Button } from "react-bootstrap";
const Signin = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

const signIn=async(e)=>{
e.preventDefault()
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("signed in successfully ")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('error occurred')
  });


}

  return (
    <Container>
    <Form onSubmit={(e)=>signIn(e)}>
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
      

      <Button variant="primary" type="submit">
        Sign In
      </Button>
      {/* <p onClick={()=>()}>sign in</p> */}
    </Form>

  </Container>
  )
}

export default Signin