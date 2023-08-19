import { useState, useContext,useRef, useEffect } from "react";
import { userContext } from "../contexts/ContextProvider";
import {
  MDBCol,
  MDBInput,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBProgress,
  MDBProgressBar,
  MDBCardHeader,
  MDBCardTitle,
  MDBCardFooter,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";

export default function Profile() {
  const {userInfo} = useContext(userContext);
  // const typeUser =useContext(userContext.use)
 const [nameState,setNameState]=useState<string|undefined>('')
  useEffect(()=>{
    setNameState(userInfo?.name)
  },[])
  
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="text-muted mb-1">Full stack JS developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-2">
                    <MDBRow>
                      <MDBCol sm="4">
                        <MDBCardText>Github</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="8">
                        <MDBInput id="typeURL" type="url" />
                      </MDBCol>
                    </MDBRow>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-2">
                    <MDBRow>
                      <MDBCol sm="4">
                        <MDBCardText>LinkedIn</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="8">
                        <MDBInput id="typeURL" type="url" />
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
              <MDBBtn color="success">Save changes</MDBBtn>
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
                    <MDBInput   id="typeName" type="text" value= { nameState } onChange={(e)=>{setNameState(e.target.value)}} />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput id="typeEmail" type="email" value={userInfo?.email} />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput value={userInfo?.phone} id="typePhone" type="tel" />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Role</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <Form.Select aria-label="Default select example">
                      <option value="1">applicant</option>
                      <option value="2">employer</option>
                    </Form.Select>
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
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard alignment="center">
                  <MDBCardHeader>Featured</MDBCardHeader>
                  <MDBCardBody>
                    <MDBCardTitle>Special title treatment</MDBCardTitle>
                    <MDBCardText>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </MDBCardText>
                    <MDBBtn href="#">Go somewhere</MDBBtn>
                  </MDBCardBody>
                  <MDBCardFooter>2 days ago</MDBCardFooter>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard alignment="center">
                  <MDBCardHeader>Featured</MDBCardHeader>
                  <MDBCardBody>
                    <MDBCardTitle>Special title treatment</MDBCardTitle>
                    <MDBCardText>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </MDBCardText>
                    <MDBBtn href="#">Go somewhere</MDBBtn>
                  </MDBCardBody>
                  <MDBCardFooter>2 days ago</MDBCardFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
