import React, { useState, useContext } from "react";
import { userContext } from "../contexts/ContextProvider";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebaseConfig";
import { Container, Form, Button, Col, Nav, Row } from "react-bootstrap";
const Signin = () => {
  const { setUserInfo, setLoggedIn } = useContext(userContext);
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
          .then((res) => {
            setUserInfo(res.data.user);
            alert(`signed in successfully ${user}`);
            sessionStorage.setItem("loggedIn", "true");
            //navigate based on the user role (applicant or employer)
            setLoggedIn("true");
            res.data.user.role === "applicant"
              ? navigate("/")
              : navigate("/dash");
          });
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
        axios
          .get(`http://localhost:5000/user/${localStorage.getItem("email")}`)
          .then((res) => {
            setUserInfo(res.data.user);
            alert("signed in successfully ");
            sessionStorage.setItem("loggedIn", "true");
            setLoggedIn("true");
            res.data.user?.role === "applicant"
              ? navigate("/")
              : navigate("/dash");
          });
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
      <Row className="mt-5">
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
            <Row className="mt-3">
              <Col>
                <Button variant="primary" type="submit" className="w-100">
                  Sign In
                </Button>
              </Col>
              <Col>
                <Button
                  className="d-flex align-items-center justify-content-center w-100 mt-2 mt-md-0"
                  onClick={signinWithGoogle}
                >
                  <img
                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                    alt="Google Logo"
                    className="me-2"
                  />
                  Google Signin
                </Button>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs={2}></Col>
              <Col xs={10}>
                <Nav.Link onClick={resetPassword}>
                  Forgot password?{" "}
                  <span
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      fontWeight: "bold",
                    }}
                    className="mt-3"
                  >
                    Click here
                  </span>
                </Nav.Link>
              </Col>
            </Row>
            <div className="mt-3 text-center">
              Don't have an account?{" "}
              <Link
                style={{ color: "blue", fontWeight: "bold" }}
                to="/register"
              >
                Sign up
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
