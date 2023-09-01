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
import axios from "axios";
import { useDispatch } from "react-redux";
import { selectOffer } from "../features/job/jobSlice.js";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../contexts/ContextProvider.js";
interface jobType {
  _id: string;
  title: string;
  description: string;
  companyDesc: string;
  requirement: string;
}

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState<boolean>(false);
  const [keyWord, setKeyWord] = useState<string>("");
  const [filteredData, setFilteredData] = useState<jobType[]>(data);
  const [display, setDisplay] = useState<number>(5);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useContext(userContext);
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
    !Object.values(userInfo).every((e) => e !== "")
      ? setShowAlert(true)
      : setShowAlert(false);
  }, []);
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

  return (
    <div>
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
                    onClick={() => {
                      dispatch(selectOffer(job));

                      navigate("/jobApply");
                    }}
                  >
                    See more and apply
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <Button onClick={() => setDisplay((prev) => prev + 5)}>see more</Button>
    </div>
  );
};

export default Home;
