import React from "react";
import { Button, Nav, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { selectOffer } from "../../features/job/jobSlice";
import EmployerGraphs from "./EmployerGraphs";
const { useState, useEffect } = React;
interface jobListType {
  _id: string;
  title: string;
  companyDesc: string;
  employerEmail: string;
  requirement: string;
  description: string;
}
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const EmployerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobList, setJobList] = useState<jobListType[]>([]);
  const [openPosts, setOpenPosts] = useState<boolean>(false);
  const [openGraphs, setOpenGraphs] = useState<boolean>(true);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/job/${localStorage.getItem("email")}`)
      .then((res) => setJobList(res.data?.listOfJobs));
  }, []);

  return (
    <div>
      <Nav
        className="Row"
        variant="tabs"
        defaultActiveKey="/home"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col lg={1} sm={0}>
          {" "}
        </Col>
        <Col
          className="d-flex flex-column flex-md-row justify-content-between align-items-center"
          style={{
            fontFamily: "Times",

            padding: "10px",
          }}
        >
          <Nav.Item
            style={{
              width: "200px",
              marginBottom: "1%",
              border: "1px solid #ccc",
            }}
          >
            <Nav.Link as={Link} to="/addjob">
              Publish a new job
            </Nav.Link>
          </Nav.Item>

          <Nav.Item
            style={{
              width: "200px",
              marginBottom: "1%",
              border: `1px solid ${!openPosts ? "#ccc" : "red"}`,
            }}
          >
            <Nav.Link
              onClick={() => {
                setOpenGraphs(false);
                setOpenPosts((prev) => !prev);
              }}
            >
              {!openPosts ? "Manage Applications" : "Close List of Application"}
            </Nav.Link>
          </Nav.Item>

          <Nav.Item
            style={{
              width: "200px",
              marginBottom: "1%",
              border: `1px solid #ccc`,
            }}
          >
            <Nav.Link onClick={() => navigate("/explore")}>
              Explore candidates
            </Nav.Link>
          </Nav.Item>

          <Nav.Item
            style={{
              width: "200px",
              marginBottom: "1%",
              border: `1px solid ${!openGraphs ? "#ccc" : "red"}`,
            }}
          >
            <Nav.Link
              onClick={() => {
                setOpenPosts(false);
                setOpenGraphs((prev) => !prev);
              }}
            >
              {!openGraphs ? "Data Analytics" : "Close the Graphs"}
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col lg={1} sm={0}></Col>
      </Nav>

      <MDBRow style={{ margin: "2%" }}>
        {openPosts &&
          jobList.map((job) => (
            <MDBCol md="4" className="mb-4" key={job._id}>
              <MDBCard alignment="center">
                <MDBCardHeader>{job.title}</MDBCardHeader>
                <MDBCardBody>
                  {/* <MDBCardTitle></MDBCardTitle> */}
                  <MDBCardText>
                    {job.requirement
                      .split(" ")
                      .filter((e, i) => i < 6)
                      .join(" ")}
                    ...
                  </MDBCardText>
                  <Button
                    onClick={() => {
                      dispatch(selectOffer(job));
                      navigate("/applications");
                    }}
                  >
                    Applications to this post
                  </Button>
                </MDBCardBody>
                <MDBCardFooter>{"number of applicants"}</MDBCardFooter>
              </MDBCard>
            </MDBCol>
          ))}
      </MDBRow>
      {openGraphs && <EmployerGraphs />}
    </div>
  );
};

export default EmployerDashboard;
