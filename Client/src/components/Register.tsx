import { Container, Form, Button, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
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
                name: null,
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
        })
        .then((res) => {
          // console.log(res.data.user);
          localStorage.setItem("email", `${user.email}`);
          setSignUpAlert(true);
          res.data?.user?.role === "applicant" ||
          res.data?.existingUser?.role === "applicant"
            ? navigate("/home")
            : navigate("/dash");
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
          account registred successfully
        </Alert>
      )}
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        <Form onSubmit={(e) => registUser(e)}>
          <p>Employer or job seeker</p>
          <Form.Select
            aria-label="your role "
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="applicant">applicant</option>
            <option value="employer">employer</option>
          </Form.Select>
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
          <Button style={{ marginLeft: "10%" }} onClick={signinWithGoogle}>
            {/* <a
              className="btn btn-lg btn-google btn-block text-uppercase btn-outline"
              href="#"
            > */}
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" />
            Google signup
            {/* </a> */}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Register;
