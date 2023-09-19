import { useState, useContext, useEffect } from "react";
import { userContext } from "../../contexts/ContextProvider";
import { Button, Col, Row } from "react-bootstrap";
import {
  MDBCol,
  MDBInput,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBCardHeader,
  MDBCardTitle,
  MDBCardFooter,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import axios from "axios";
import { Form } from "react-bootstrap";
import ProfileTitle from "./ProfileTitle";
import PersonalInfo from "./PersonalInfo";
import RecentAppsProfile from "./RecentAppsProfile";

export default function Profile() {
  const { userInfo, setUserInfo } = useContext(userContext);
  const [apps, setApps] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/job/apps/${localStorage.getItem("email")}`)
      .then((res) => {
        setApps(res.data.result.reverse());
      });
  }, []);

  const updateInfo = () => {
    axios
      .put("http://localhost:5000/user/", userInfo)
      .then((res) => {
        setUserInfo(res.data.user);
        alert(res.data.message);
      })
      .catch((err) => alert(err.message));
  };
  const contactEmployer = (email) => {
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;
  };
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <ProfileTitle
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            updateInfo={updateInfo}
          />
          <MDBCol lg="8">
            <PersonalInfo userInfo={userInfo} setUserInfo={setUserInfo} />
            <RecentAppsProfile
              userInfo={userInfo}
              apps={apps}
              contactEmployer={contactEmployer}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
