import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import useAuth from "../../../hook/useAuth";
import NavBar from "../../shared/NavBar/NavBar";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //getting users profile
  useEffect(() => {
    fetch(`https://blooming-beach-91976.herokuapp.com/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  const handleSubmit = (e) => {
    const data = {
      name,
      email,
      phone,
      address,
    };

    //updating users info
    fetch("https://blooming-beach-91976.herokuapp.com/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          alert("updated Successfully");
        }
      });

    e.preventDefault();
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  return (
    <>
      <NavBar></NavBar>
      <Container>
        <h3 className="my-5">Your Profile</h3>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} className="w-100" md="4">
              <Form.Label>Name</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  defaultValue={profile.name}
                  onBlur={handleName}
                  aria-describedby="inputGroupPrepend"
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} className="w-100" md="4">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  defaultValue={profile.email}
                  onBlur={handleEmail}
                  aria-describedby="inputGroupPrepend"
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} className="w-100" md="4">
              <Form.Label>Phone</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Phone"
                  defaultValue={profile.phone}
                  onBlur={handlePhone}
                  aria-describedby="inputGroupPrepend"
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} className="w-100" md="4">
              <Form.Label>Address</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  as="textarea"
                  onBlur={handleAddress}
                  defaultValue={profile.address}
                  placeholder="Your Address"
                  style={{ height: "100px" }}
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Edit
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Profile;
