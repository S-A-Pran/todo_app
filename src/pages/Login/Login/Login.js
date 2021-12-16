import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";

const Login = () => {
  //storing email and password in a state
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { isRoleUser, emailPasswordSignin  } = useAuth();
  const navigate = useNavigate();
  const emailLogo = <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>;

  //collecting email from user input field
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  //collecting password from password field
  const handlePass = (e) => {
    setPass(e.target.value);
  };

  //submitting the info for login
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    console.log(email, pass);
    emailPasswordSignin(email, pass, navigate);
  };
  return (
    <>
      {/* swaping test based on the user and admin */}
      {isRoleUser ? (
        <h3 className="text-primary fw-bold text-center p-2 rounded-pill shadow-lg">
          User Login
        </h3>
      ) : (
        <h3 className="text-primary fw-bold text-center p-2 rounded-pill shadow-lg">
          Admin Login
        </h3>
      )}

      <Container className="d-flex flex-column flex-lg-row justify-content-center align-items-center mt-5">
        <div className="text-center">
          <img
            className="img-fluid w-75"
            src="https://image.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg"
            alt=""
          />
        </div>
        <div className="p-5 shadow rounded">
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} className="w-100" md="4">
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    {emailLogo}
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onBlur={handleEmail}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="w-100" md="4">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    {emailLogo}
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    onBlur={handlePass}
                    placeholder="Password"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
          {isRoleUser && <div className="text-center mt-2">
            <span className="fs-5 fw-bold">
              not registered? Register Now....
            </span>
            <Link to="/register">
              <Button variant="warning">Register</Button>
            </Link>
          </div>}
        </div>
      </Container>
    </>
  );
};

export default Login;
