import { Container, Form, Button, Col } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import axios from "axios";
import { auth, provider } from "../config/firebaseConfig";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  // const emailRegex = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/";
  const registUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    confirmPassword === password
      ? createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            axios
              .post("http://localhost:5000/user", {
                email: user.email,
                role: "applicant",
              })
              .then((res: any) => {
                console.log(res.data.message);
                navigate("/signin");
              })
              .catch((err) => console.log(err.message));
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
          })
      : alert("retype password correctly");
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
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <Container>
      <Form onSubmit={(e) => registUser(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
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
            Signup Using Google
          </a>
        </Col>
      </Button>
    </Container>
  );
};

export default Register;
