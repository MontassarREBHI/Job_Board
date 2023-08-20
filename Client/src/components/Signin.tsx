import React, { useState, useContext } from "react";
import { userContext } from "../contexts/ContextProvider";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebaseConfig";
import { Container, Form, Button, Col, Nav, Row } from "react-bootstrap";
const Signin = () => {
  const { setUserInfo } = useContext(userContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        localStorage.setItem("email", `${user.email}`);

        axios
          .get(`http://localhost:5000/user/${localStorage.getItem("email")}`)
          .then((res) => setUserInfo(res.data.user));

        alert(`signed in successfully ${user}`);

        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("error occurred");
        console.log(errorCode, errorMessage);
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
        localStorage.setItem("email", `${user.email}`);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
        alert("signed in successfully ");
        navigate("/");
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
      <Row style={{ marginTop: "10%" }}>
        <Col xs={4}></Col>
        <Col xs={4}>
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
            <Row style={{ marginTop: "5%" }}>
              <Col xs={6}> Forgot password ?</Col>
              <Col xs={3}>
                <Nav.Link onClick={resetPassword}>Click here</Nav.Link>
              </Col>
            </Row>

            {/* <p onClick={()=>()}>sign in</p> */}
          </Form>
        </Col>
        <Col xs={4}></Col>
      </Row>
      <Button
        style={{ border: "solid black", marginTop: "3%" }}
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
