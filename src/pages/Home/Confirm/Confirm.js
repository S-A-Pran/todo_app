import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import useAuth from "../../../hook/useAuth";
import NavBar from "../../shared/NavBar/NavBar";

const Confirm = () => {
  //storing email and password in a state
  const [item, setItem] = useState({});
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
//   paypal info
  const initialOptions = {
    "client-id": `${process.env.CLIENT_ID}`,
    currency: "USD",
    intent: "capture",
    "data-client-token": "abc123xyz==",
};

  console.log(id);


  useEffect(() => {
    fetch(`http://localhost:5000/package/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [id]);

  //submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        ...item,
        email: user.email
    }
    // posting the buying info
    fetch("http://localhost:5000/subscription", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        if(data.insertedId){
            alert("Order Placed Successfully");
        }
    })
    console.log(data);
    navigate('/')
  };
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <div className="d-flex flex-column flex-lg-row justify-content-around align-items-center mt-5">
          <div className="text-center">
            <img
              className="img-fluid w-75"
              src="https://img.freepik.com/free-vector/digital-wallet-abstract-concept-illustration_335657-3896.jpg?size=338&ext=jpg"
              alt=""
            />
          </div>
          <div className="p-5 shadow rounded">
            <h5 className="text-primary fw-bold text-center p-2 rounded-pill shadow-lg mb-4">
              Add Notes
            </h5>
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} className="w-100" md="4">
                  <Form.Label>Package Name</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="Pack Name"
                      value={item.title}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} className="w-100" md="4">
                  <Form.Label>Customer Name</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="Customer Name"
                      value={user.displayName}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} className="w-100" md="4">
                  <Form.Label>Price</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="Customer Name"
                      value={item.price}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Row>

              <div className="text-center">
                <PayPalScriptProvider
                  options={initialOptions}
                >
                  <PayPalButtons style={{ layout: "horizontal" }} />
                </PayPalScriptProvider>
                <Button type="submit" variant="primary">
                    Buy Now
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Confirm;
