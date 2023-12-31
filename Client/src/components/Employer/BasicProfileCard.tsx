import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import applicant from "../../types";
export default function BasicProfileCard({ applicant, contactProfile }) {
  const navigate = useNavigate();
  return (
    <div>
      <MDBContainer>
        <MDBRow className="justify-content-center mb-2">
          <MDBCol>
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-2">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      onClick={() => navigate("/scan", { state: applicant })}
                      style={{ maxWidth: "100px", borderRadius: "10px" }}
                      src={
                        applicant.photo
                          ? applicant.photo
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt="Generic placeholder image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{applicant.name}</MDBCardTitle>
                    <MDBCardText>{applicant.title}</MDBCardText>

                    <div className="d-flex pt-1 ">
                      <MDBBtn
                        outline
                        className="me-1 flex-grow-1 btn"
                        onClick={(e) => {
                          e.preventDefault();
                          contactProfile(applicant.email);
                        }}
                      >
                        Email
                      </MDBBtn>
                      <MDBBtn className="flex-grow-1 btn" outline>
                        <Nav.Link href={applicant.linkedIn} target="_blank">
                          LinkedIn
                        </Nav.Link>
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
