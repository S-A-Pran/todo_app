import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCog } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Role.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";

const Role = () => {
  const {isRoleUser, setRoleUser} = useAuth();

  const navigate = useNavigate();
  const haldleUser = () => {
    setRoleUser(true);
    navigate("/login");
  };

  const handleAdmin = () => {
    setRoleUser(false);
    navigate("/login");
  };

  const setting = <FontAwesomeIcon icon={faUserCog}></FontAwesomeIcon>;
  const user = <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>;
  return (
    <Container className="my-5">
      <h3 className="text-primary fw-bold text-center p-2 rounded-pill shadow-lg">
        TODO APP
      </h3>
      {/* creating two row for the pic and the role selection */}

      <div className="d-lg-flex justify-content-center justify-content-lg-between align-items-center mt-5 ">
        <div>
          {/* picture insertion */}
          <img
            className="img-fluid"
            src="https://image.freepik.com/free-vector/welcome-word-flat-cartoon-people-characters_81522-4207.jpg"
            alt=""
          />
        </div>

        <div className="text-center rounded-pill bg-info p-5 shadow-lg">
          {/* role part */}
          <h4 className="my-3 text-light fw-bold">Choose Your Role</h4>

          <Button
            onClick={haldleUser}
            className="text-light fw-bold me-2"
            variant="primary"
          >
            {user} User
          </Button>

          <Button
            onClick={handleAdmin}
            className="text-light fw-bold"
            variant="secondary"
          >
            {setting} Admin
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Role;
