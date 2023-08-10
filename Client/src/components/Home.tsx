import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import data from "../dummyData.js";
import { useSelector, useDispatch } from "react-redux";
import { selectOffer } from "../features/job/jobSlice.js";
import { RootState } from "../app/store.js";

interface jobType {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const Home = () => {
  const [offer, setOffer] = useState(false);
  let selectedJob = useSelector((state: RootState) => {
    return state.job.value;
  });
  useEffect(() => {
    console.log(selectedJob);
  }, [offer]);
  const dispatch = useDispatch();
  return (
    <div style={{ display: "inline-block" }}>
      <Row>
        {data.map((job: jobType) => (
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
                    setOffer((prev) => {
                      return !prev;
                    });
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
