import React, { useState, useEffect } from "react";
import { applicant } from "../types";
import axios from "axios";
import { Button, Row, Col, Nav } from "react-bootstrap";
const ExploreProfiles = () => {
  const [applicants, setApplicants] = useState<applicant[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/user")
      .then((res) => setApplicants(res.data.applicants))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div>
      <Row>
        {applicants.map((e) => (
          <Col xs={3} style={{ marginBottom: "2%" }}>
            <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
              <img
                className="h-15  rounded-t-lg object-cover md:h-40 md:!rounded-none md:!rounded-l-lg"
                src="https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg"
                alt=""
              />
              <div className="flex flex-col justify-start p-6">
                <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                  {e.name}
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                  <Nav.Link
                    href={e.linkedIn}
                    target="_blank"
                    style={{ display: "flex" }}
                  >
                    visit linkedin:{" "}
                    <svg
                      color="blue"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-full w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </Nav.Link>
                </p>
                <Button>get in touch</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ExploreProfiles;
