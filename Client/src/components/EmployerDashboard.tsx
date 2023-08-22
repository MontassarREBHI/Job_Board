import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBCardFooter,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { selectOffer } from "../features/job/jobSlice";
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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/job/${localStorage.getItem("email")}`)
      .then((res) => setJobList(res.data?.listOfJobs));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        {" "}
        here are your Published job offers
      </h1>
      <MDBRow style={{ margin: "2%" }}>
        {jobList.map((job) => (
          <MDBCol md="4" key={job._id}>
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
                <MDBBtn
                  onClick={() => {
                    dispatch(selectOffer(job));
                    navigate("/applications");
                  }}
                >
                  Applications to this post
                </MDBBtn>
              </MDBCardBody>
              <MDBCardFooter>{"number of applicants"}</MDBCardFooter>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
};

export default EmployerDashboard;
