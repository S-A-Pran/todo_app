import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const [packs, setPacks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/package")
      .then((res) => res.json())
      .then((data) => setPacks(data));
  }, []);


  const handleBuy = (id) =>{
    console.log(id);
    navigate(`/confirm/${id}`);
  }
  return (
    <Container>
      <h3 className="text-primary my-5 fw-bold">Buy Packages</h3>
      <Row className="my-5">
        {packs.map((pack) => (
          <Col key={pack._id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={pack.img} />
              <h4 className="text-center text-light bg-primary p-2">{pack.title}</h4>
              <Card.Body>
                <p>{pack.notes}</p>
                <h6>Price: {pack.price} taka</h6>
                <div className="text-center">
                  <Button onClick={() => handleBuy(pack._id)} className="text-light" variant="info">Buy Now</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Packages;
