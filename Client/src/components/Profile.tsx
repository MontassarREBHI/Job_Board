import { useState, useContext, useEffect } from "react";
import { userContext } from "../contexts/ContextProvider";
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
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center  ">
                <Row>
                  <Col
                    xs={12}
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <MDBCardImage
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt="avatar"
                      className="rounded-circle"
                      style={{
                        width: "150px",
                        marginLeft: "25%",
                        marginBottom: "2%",
                      }}
                      fluid
                    />
                  </Col>
                </Row>

                <MDBInput
                  id="typeTitle"
                  type="text"
                  placeholder="Your title here"
                  value={userInfo?.title}
                  onChange={(e) =>
                    setUserInfo((prev) => {
                      return { ...prev, title: e.target.value };
                    })
                  }
                />
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-2">
                    <MDBRow>
                      <MDBCol sm="4">
                        <MDBCardText>LinkedIn</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="8">
                        <MDBInput
                          value={userInfo?.linkedIn}
                          type="text"
                          placeholder="Profile URL"
                          onChange={(e) =>
                            setUserInfo((prev) => {
                              return { ...prev, linkedIn: e.target.value };
                            })
                          }
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
            <div
              className="d-grid gap-2 col-6 mx-auto"
              style={{ marginTop: "5%" }}
            >
              <Button variant="success" onClick={updateInfo}>
                Save changes
              </Button>
            </div>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      id="typeName"
                      type="text"
                      value={userInfo?.name}
                      onChange={(e) => {
                        setUserInfo((prev) => {
                          return { ...prev, name: e.target.value };
                        });
                      }}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      id="typeEmail"
                      type="email"
                      value={userInfo?.email}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      value={userInfo?.phone}
                      id="typePhone"
                      type="tel"
                      onChange={(e) => {
                        setUserInfo((prev) => {
                          return { ...prev, phone: e.target.value };
                        });
                      }}
                    />
                  </MDBCol>
                </MDBRow>

                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      id="typeAddress"
                      type="text"
                      value={userInfo?.address}
                      onChange={(e) => {
                        setUserInfo((prev) => {
                          return { ...prev, address: e.target.value };
                        });
                      }}
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              {userInfo.role === "applicant" && (
                <h3
                  style={{
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "20px",
                  }}
                >
                  <i
                    className="fas fa-clock"
                    style={{ marginRight: "10px" }}
                  ></i>{" "}
                  Recent applications{" "}
                </h3>
              )}
              {userInfo.role === "applicant" &&
                apps
                  .filter((e, i) => i < 2)
                  ?.map((app) => (
                    <MDBCol md="6" key={app._id}>
                      <MDBCard alignment="center">
                        <MDBCardHeader>
                          Application Status:{" "}
                          <span style={{ color: "green" }}>{app.status}</span>
                        </MDBCardHeader>
                        <MDBCardBody>
                          <MDBCardTitle>{app.jobTitle}</MDBCardTitle>
                          <MDBCardText>{app.companyDesc}</MDBCardText>
                          <Button
                            onClick={() => contactEmployer(app.employerEmail)}
                          >
                            Contact the employer
                          </Button>
                        </MDBCardBody>
                        <MDBCardFooter>
                          {(
                            (new Date().getTime() -
                              new Date(app.applyDate).getTime()) /
                            (1000 * 60 * 60 * 24)
                          ).toFixed(0)}{" "}
                          days ago
                        </MDBCardFooter>
                      </MDBCard>
                    </MDBCol>
                  ))}
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
