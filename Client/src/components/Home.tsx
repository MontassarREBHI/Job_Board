import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import data from "../dummyData.js";
import { useDispatch } from "react-redux";
import { selectOffer } from "../features/job/jobSlice.js";
import { useState,useEffect } from "react";

interface jobType {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  companyDesc: string;
  jobRequirement: string;
}

const Home = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [keyWord, setKeyWord] = useState<string>("");
  const [filteredData, setFilteredData] = useState<jobType[]>(data);
  const navigate = useNavigate();

  const dispatch = useDispatch();
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
    <div >
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
        {filteredData.map((job: jobType) => (
          <Col key={job.id} xs={3}>
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
                  Apply
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
