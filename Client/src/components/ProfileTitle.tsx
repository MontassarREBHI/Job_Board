import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";

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
const ProfileTitle = ({ userInfo, setUserInfo, updateInfo }) => {
  const [isHovered, setIsHovered] = useState(false);

  const savePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("upload_preset", "n5owabtw");
    formData.append("file", e.target.files[0]);
    axios
      .post("https://api.cloudinary.com/v1_1/dde5n1zdt/upload", formData)
      .then((res) => setUserInfo({ ...userInfo, photo: res.data.url }))
      .catch((err) => console.log(err.message));
  };
  return (
    <MDBCol lg="4">
      <MDBCard className="mb-4">
        <MDBCardBody className="text-center">
          <Row>
            <Col
              xs={12}
              style={{
                justifyContent: "center",
              }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <MDBCardImage
                  src={
                    userInfo.photo
                      ? userInfo.photo
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="avatar"
                  className="rounded-circle"
                  style={{
                    width: "150px",
                    marginLeft: "5%",
                    marginBottom: "2%",
                  }}
                  fluid
                />

                <input
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "10%",
                    width: "100%",
                    height: "100%",
                    opacity: "0",
                    cursor: "pointer",
                    zIndex: "2",
                  }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    savePicture(e);
                  }}
                />
              </div>
              {/* <Button onClick={savePicture}>Confirm profile picture</Button> */}
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
      <div className="d-grid gap-2 col-6 mx-auto" style={{ marginTop: "5%" }}>
        <Button variant="success" onClick={updateInfo}>
          Save changes
        </Button>
      </div>
    </MDBCol>
  );
};

export default ProfileTitle;
