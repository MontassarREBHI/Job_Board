import { Col, Form, Button, Row } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { auth, provider } from "../config/firebaseConfig";

const Register: React.FC = () => {
  const [signUpAlert, setSignUpAlert] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [newRole, setNewRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const selectedJob = useSelector((state) => state.job.value);

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
                role: newRole || "applicant",
                phone: null,
                address: null,
                CV: null,
                photo: null,
                name: null,
                title: null,
                linkedIn: null,
                about: null,
              })
              .then(async () => {
                setSignUpAlert(true);
                navigate("/signin");
              })
              .catch((err) => console.log(err.message));
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            alert(errorMessage);
            // ..
          })
      : alert("retype password correctly");
  };
  const signinWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      // The signed-in user info.
      const user = result.user;
      axios
        .post("http://localhost:5000/user", {
          email: user.email,
          role: newRole || "applicant",
          phone: null,
          address: null,
          CV: null,
          name: null,
          title: null,
          linkedIn: null,
          photo: null,
          about: null,
        })
        .then(() => {
          // console.log(res.data.user);
          localStorage.setItem("email", `${user.email}`);
          setSignUpAlert(true);
          navigate("/signin");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode);
        });
    });
  };
  return (
    <>
      {signUpAlert && (
        <Alert
          variant="success"
          onClose={() => setSignUpAlert(false)}
          dismissible
        >
          Account registered successfully.
        </Alert>
      )}
      <Row className="w-max">
        <Col md={1} ms={0} xs={0} lg={3}></Col>
        <Col>
          <Form
            onSubmit={(e) => registUser(e)}
            className=" justify-content-center align-items-center m-5"
          >
            <h2 style={{ textAlign: "center" }}>Sign Up</h2>
            <Form.Group className="mb-3" controlId="role">
              <Form.Label>Employer or job seeker ?</Form.Label>
              <Form.Select
                aria-label="Select your role"
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="applicant">applicant</option>
                <option value="employer">employer</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-type Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">
              <Button
                variant="primary"
                type="submit"
                className="btn btn-primary"
              >
                Sign Up
              </Button>
              <Button
                onClick={signinWithGoogle}
                className="btn btn-primary mt-3 mt-md-0 ms-md-3"
              >
                <img
                  src="https://img.icons8.com/color/16/000000/google-logo.png"
                  alt="Google Logo"
                  className="me-2"
                />
                Google signup
              </Button>
            </div>

            <div className="mt-3 text-center">
              Already have an account? <Link to="/signin">Sign in</Link>
            </div>
          </Form>
        </Col>
        <Col md={1} ms={0} xs={0} lg={3}></Col>
      </Row>
    </>
  );
};

export default Register;
