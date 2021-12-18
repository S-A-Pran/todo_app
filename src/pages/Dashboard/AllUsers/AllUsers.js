import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteUser } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import useAuth from "../../../hook/useAuth";
import NavBar from "../../shared/NavBar/NavBar";

const AllUsers = () => {
  // setting on state
  const { user, removeUser, idToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  //collecting name from name field
  const handleName = (e) => {
    setName(e.target.value);
  };

  //dleting user
  const handleDelete = (email) => {
    console.log(name);
    fetch(`https://blooming-beach-91976.herokuapp.com/users/${email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          //   removeUser();
          alert("Deleted Successfully");
        }
      });
    setShow(false);
  };
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    // console.log(e);
    setEmail(e);
  };

  const handleSubmit = () => {
    const data = { name, email };
    console.log(data);

    //updating user name
    fetch(`https://blooming-beach-91976.herokuapp.com/users/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          alert("Updated Successfully");
        } else {
          alert("Opps Something went wrong. Try again");
        }
      });
  };

  const trash = <FontAwesomeIcon icon={faTrash} />;
  const edit = <FontAwesomeIcon icon={faPen} />;
  useEffect(() => {
    //getting users data
    fetch("https://blooming-beach-91976.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <Container>
        {/* modal coponent */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Name</Modal.Title>
          </Modal.Header>
          <Form.Group className="mb-3 p-3" controlId="formBasicEmail">
            <Form.Label>Enter Name</Form.Label>
            <Form.Control
              onBlur={handleName}
              type="text"
              placeholder="Enter name"
              required
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {/* title of the user number */}
        <h3 className="my-5 text-primary fw-bold">Total User {users.length}</h3>
        <Row className="my-5">
          {users.map((user) => (
            <Col className="my-4" key={user._id}>
              <Card style={{ width: "18rem" }}>
                <div className="text-center my-2">
                  <Card.Img
                    variant="top"
                    className="w-50"
                    src="https://image.flaticon.com/icons/png/512/1251/1251572.png"
                  />
                </div>
                <h4 className="text-center text-light bg-primary p-2">
                  {user?.name}
                </h4>
                <Card.Body>
                  {/* used optional chaining for avoiding error */}
                  <h6 className="text-center">{user?.email}</h6>
                </Card.Body>
                <div className="text-center my-2">
                  <Button
                    className="rounded-circle text-light me-1"
                    variant="danger"
                    onClick={() => handleDelete(user?.email)}
                  >
                    {trash}
                  </Button>
                  <Button
                    className="ms-1 rounded-circle text-light"
                    variant="warning"
                    onClick={() => handleShow(user?.email)}
                  >
                    {edit}
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AllUsers;
