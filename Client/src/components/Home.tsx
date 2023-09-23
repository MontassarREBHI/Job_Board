import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import axios from "axios";
import { useDispatch } from "react-redux";
import { selectOffer } from "../features/job/jobSlice.js";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../contexts/ContextProvider.js";

import { UserContextType } from "../types.js";
interface jobType {
  _id: string;
  title: string;
  description: string;
  companyDesc: string;
  jobRequirement: string;
  employerEmail: string;
}

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState<boolean>(false);
  const [keyWord, setKeyWord] = useState<string>("");
  const [filteredData, setFilteredData] = useState<jobType[]>(data);
  const [display, setDisplay] = useState<number>(8);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const { userInfo, loggedIn } = useContext<UserContextType>(userContext);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5000/job")
      .then((res) => {
        setData(res.data.list);
        setFilteredData(res.data.list.reverse());
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  useEffect(() => {
    const { CV, ...userInfoWithoutCV } = userInfo;
    loggedIn === "true"
      ? //  {...userInfor,cv}=[newUserInfo,]
        !Object.values(userInfoWithoutCV).every((e) => e !== "")
        ? setShowAlert(true)
        : setShowAlert(false)
      : null;
  }, [userInfo]);

  useEffect(() => {
    if (!keyWord) {
      setFilteredData(data);
    } else {
      const filteredJobs = data.filter((job: jobType) =>
        job.title.toLowerCase().includes(keyWord.toLowerCase())
      );
      setFilteredData(filteredJobs);
    }
  }, [keyWord]);

  const signInToApply = () => {
    confirmAlert({
      title: "Sign in to apply ! ",
      message: "You will be directed to sign-in page",
      buttons: [
        {
          label: "Go Sign in",
          onClick: () => navigate("/signin"),
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
    });
  };
  const AlreadySingedIn = (selectedJob: jobType) => {
    dispatch(selectOffer(selectedJob));

    navigate("/jobApply");
  };
  return (
    <>
      {showAlert && (
        <Alert variant="warning" dismissible>
          <Alert.Heading>Complete your profile</Alert.Heading>
          <p>
            Completing your profile details will increase your visibilty to the
            employers
          </p>
        </Alert>
      )}
      <Container
        style={{
          display: "flex",
          marginInlineStart: "40%",
          marginTop: "5%",
          marginBottom: "2%",
        }}
      >
        <Button onClick={() => setSearch((prev) => !prev)}>
          {" "}
          search a job{" "}
        </Button>
      </Container>
      {search && (
        <>
          <FloatingLabel
            style={{ marginInline: "25%" }}
            controlId="floatingInput"
            label="search by title"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="enter a key word"
              onChange={(e) => {
                setKeyWord(e.target.value);
              }}
            />
          </FloatingLabel>
        </>
      )}
      <Row>
        {filteredData
          .filter((e, i) => i < display)
          .map((job: jobType) => (
            <Col key={job._id} xs={3}>
              <Card style={{ marginBottom: "3%" }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Text>
                    {job.description
                      .split(" ")
                      .filter((e, i) => i <= 6)
                      .join(" ")}
                    ...
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={
                      loggedIn === "true"
                        ? () => AlreadySingedIn(job)
                        : signInToApply
                    }
                  >
                    See more and apply
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <Button onClick={() => setDisplay((prev) => prev + 5)}>see more</Button>
    </>
  );
};

export default Home;
