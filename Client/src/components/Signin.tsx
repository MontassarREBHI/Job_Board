import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, provider } from "../config/firebaseConfig";
import { Container, Form, Button, Col, Nav, Row } from "react-bootstrap";
const Signin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("signed in successfully ");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("error occurred");
      });
  };

  const signinWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        alert("signed in successfully ");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        alert("error occurred");
      });
  };
  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        alert("Password reset email sent!");
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <Container>
      <Form onSubmit={(e) => signIn(e)}>
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
        <Row>
          <Col xs={6}> Forgot password ?</Col>
          <Col xs={6}>
            <Nav.Link onClick={resetPassword}>Click here</Nav.Link>
          </Col>
        </Row>

        {/* <p onClick={()=>()}>sign in</p> */}
      </Form>
      <Button
        style={{ border: "solid black", marginTop: 5 }}
        onClick={signinWithGoogle}
      >
        <Col>
          <a
            className="btn btn-lg btn-google btn-block text-uppercase btn-outline"
            href="#"
          >
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" />
            Signin Using Google
          </a>
        </Col>
      </Button>
    </Container>
  );
};

export default Signin;
