import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../../hook/useAuth";

const NavBar = () => {
  const { user, isAdmin } = useAuth();
  const circle = <FontAwesomeIcon icon={faCircle} />;
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          TODO APP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* used conditional rendering */}
          {!isAdmin ? (
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/mysubscription">
                Your Subcriptions
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              <NavDropdown title="Dashboard" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/allnotes">
                  All notes
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/addnote">
                  Create notes
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              <NavDropdown title="Dashboard" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/allusers">
                  View User
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/createsubscription">
                  Create Subscription
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
          <Nav>
            <Nav.Link>
              <Button variant="info" className="rounded-pill">
                {user?.displayName?.split(" ")[0]}{" "}
                <span className="text-success">{circle}</span>
              </Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/role">
              <Button variant="danger">Logout</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
