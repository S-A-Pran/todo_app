import React from "react";
import { Container } from "react-bootstrap";
import NavBar from "../shared/NavBar/NavBar";

const NotFound = () => {
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <div className="text-center">
          <img
            src="https://image.freepik.com/free-vector/400-error-bad-request-concept-illustration_114360-1933.jpg"
            alt=""
          />
        </div>
      </Container>
    </>
  );
};

export default NotFound;
