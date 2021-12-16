import React from "react";
import { Container, Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../hook/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <Container style={{height: "100vh", width:"100vw" }} className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="info" />
      </Container>
    );
  }
  if (user.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default PrivateRoute;
