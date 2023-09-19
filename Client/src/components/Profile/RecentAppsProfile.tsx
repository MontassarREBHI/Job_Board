import { Button } from "react-bootstrap";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBCardFooter,
} from "mdb-react-ui-kit";
function RecentAppsProfile({ userInfo, apps, contactEmployer }) {
  return (
    <MDBRow>
      {userInfo?.role === "applicant" && (
        <h3
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          <i className="fas fa-clock" style={{ marginRight: "10px" }}></i>{" "}
          Recent applications{" "}
        </h3>
      )}
      {userInfo?.role === "applicant" &&
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
                  <Button onClick={() => contactEmployer(app.employerEmail)}>
                    Contact the employer
                  </Button>
                </MDBCardBody>
                <MDBCardFooter>
                  {(
                    (new Date().getTime() - new Date(app.applyDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                  ).toFixed(0)}{" "}
                  days ago
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          ))}
    </MDBRow>
  );
}

export default RecentAppsProfile;
