import {
  faClipboardList,
  faImage,
  faMoneyBill,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";

const Packages = () => {
  const [packs, setPacks] = useState([]);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const penLogo = <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>;
  const imgLogo = <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>;
  const moneyLogo = <FontAwesomeIcon icon={faMoneyBill}></FontAwesomeIcon>;
  const features = <FontAwesomeIcon icon={faClipboardList}></FontAwesomeIcon>;
  const trash = <FontAwesomeIcon icon={faTrash} />;
  const edit = <FontAwesomeIcon icon={faPen} />;

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

  //submitting the info for updating
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      notes,
      price,
      img,
    };
    console.log(data);

    fetch(`https://blooming-beach-91976.herokuapp.com/package/${id}`, {
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

    setShow(false);
    e.target.reset();
  };

  useEffect(() => {
    fetch("https://blooming-beach-91976.herokuapp.com/package")
      .then((res) => res.json())
      .then((data) => setPacks(data));
  }, []);

  //buy now button handle
  const handleBuy = (id) => {
    navigate(`/confirm/${id}`);
  };

  //delete button handle
  const handleDelete = (id) => {
    console.log("delete");
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      fetch(`https://blooming-beach-91976.herokuapp.com/package/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            alert("Deleted Successfully");
          }
        });
    }
  };
  const handleEdit = (id) => {
    setShow(true);
    setId(id);
    console.log("edit");
  };

  return (
    <Container>
      {/* //modal for editing packages */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Pack</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <h3 className="text-primary my-5 fw-bold">Buy Packages</h3>
      <Row>
        {packs.map((pack) => (
          <Col key={pack._id} className="my-5">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={pack.img} />
              <h4 className="text-center text-light bg-primary p-2">
                {pack.title}
              </h4>
              <Card.Body>
                <p>{pack.notes}</p>
                <h6>Price: {pack.price} USD</h6>
                <div className="text-center">
                  {!isAdmin ? (
                    <Button
                      onClick={() => handleBuy(pack._id)}
                      className="text-light"
                      variant="info"
                    >
                      Buy Now
                    </Button>
                  ) : (
                    <div>
                      <Button
                        onClick={() => handleDelete(pack._id)}
                        className="text-dark me-2"
                        variant="danger"
                      >
                        {trash}
                      </Button>
                      <Button
                        onClick={() => handleEdit(pack._id)}
                        className="text-dark ms-2"
                        variant="info"
                      >
                        {edit}
                      </Button>
                    </div>
                  )}
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
