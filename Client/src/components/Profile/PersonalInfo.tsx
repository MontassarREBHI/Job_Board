import {
  MDBCol,
  MDBInput,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { UserContextType } from "../../types";
function PersonalInfo({ userInfo, setUserInfo }: UserContextType) {
  return (
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
            <MDBInput id="typeEmail" type="email" value={userInfo?.email} />
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
  );
}

export default PersonalInfo;
