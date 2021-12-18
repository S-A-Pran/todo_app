import {
  faClipboard,
  faClipboardList,
  faEnvelope,
  faImage,
  faMoneyBill,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import NavBar from "../../shared/NavBar/NavBar";

const CreateSubscription = () => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");

  const { isRoleUser, emailPasswordSignin, user } = useAuth();
  const penLogo = <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>;
  const imgLogo = <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>;
  const moneyLogo = <FontAwesomeIcon icon={faMoneyBill}></FontAwesomeIcon>;
  const features = <FontAwesomeIcon icon={faClipboardList}></FontAwesomeIcon>;

  //collecting input field
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  //collecting title field
  const handleNotes = (e) => {
    setNotes(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleImg = (e) => {
    setImg(e.target.value);
  };

  //submitting the info for login
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      notes,
      price,
      img,
    };

    fetch(`https://blooming-beach-91976.herokuapp.com/package`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Added Successfully");
        } else {
          alert("Opps Something went wrong. Try again");
        }
      });

    e.target.reset();
  };
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <div className="d-flex flex-column flex-lg-row justify-content-around align-items-center mt-5">
          <div className="text-center">
            <img
              className="img-fluid w-50"
              src="https://image.flaticon.com/icons/png/512/526/526682.png"
              alt=""
            />
          </div>
          <div className="p-5 shadow rounded">
            <h5 className="text-primary fw-bold text-center p-2 rounded-pill shadow-lg mb-4">
              Create Subscription
            </h5>
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} className="w-100" md="4">
                  <Form.Label>Name</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">
                      {penLogo}
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      onBlur={handleTitle}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} className="w-100" md="4">
                  <Form.Label>Image Url</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">
                      {imgLogo}
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Image url"
                      onBlur={handleImg}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} className="w-100" md="4">
                  <Form.Label>Features</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">
                      {features}
                    </InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      onBlur={handleNotes}
                      placeholder="features"
                      style={{ height: "100px" }}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} className="w-100" md="4">
                  <Form.Label>Price</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">
                      {moneyLogo}
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Price"
                      onBlur={handlePrice}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Add
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CreateSubscription;
