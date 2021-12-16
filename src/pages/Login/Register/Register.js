import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";

const Register = () => {
  //storing email and password in a state
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const { emailPasswordRegister } = useAuth();
  const navigate = useNavigate();
  const emailLogo = <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>;
  const passLogo = <FontAwesomeIcon icon={faKey}></FontAwesomeIcon>;
  const userLogo = <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>;

  //collecting email from user input field
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  //collecting password from password field
  const handlePass = (e) => {
    setPass(e.target.value);
  };

  //submitting the info for login
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    console.log(name, email, pass);
    emailPasswordRegister(name, email, pass, navigate);
  };

  return (
    <>
      <h3 className="text-primary fw-bold text-center p-2 rounded-pill shadow-lg">
        Register
      </h3>
      <Container className="d-flex flex-column flex-lg-row justify-content-center align-items-center mt-5">
        <div className="text-center">
          <img
            className="img-fluid w-75"
            src="https://image.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
            alt=""
          />
        </div>
        <div className="p-5 shadow rounded">
          <Form noValidate onSubmit={handleSubmit}>
            {/* name field */}
            <Row className="mb-3">
              <Form.Group as={Col} className="w-100" md="4">
                <Form.Label>Name</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    {userLogo}
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    onBlur={handleName}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            {/* email field */}
            <Row className="mb-3">
              <Form.Group as={Col} className="w-100" md="4">
                <Form.Label>Email</Form.Label>
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
            {/* password field */}
            <Row className="mb-3">
              <Form.Group as={Col} className="w-100" md="4">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    {passLogo}
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
            {/* submit button */}
            <div className="text-center">
              <Button variant="primary" type="submit">
                Register
              </Button>
            </div>
          </Form>
          <div className="text-center mt-2">
            <span className="fs-5 fw-bold">
              Already registered? Login Now....
            </span>
            <Link to="/login">
              <Button variant="warning">Login</Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
