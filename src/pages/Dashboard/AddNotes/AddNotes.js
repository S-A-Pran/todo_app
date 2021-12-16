import { faClipboard, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import NavBar from "../../shared/NavBar/NavBar";

const AddNotes = () => {
  //storing email and password in a state
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [addedNote, setAddedNote] = useState({});
  const [item, setItem] = useState({});

  const { isRoleUser, emailPasswordSignin, user } = useAuth();
  const navigate = useNavigate();
  const email = user?.email;
  const emailLogo = <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>;
  const noteLogo = <FontAwesomeIcon icon={faClipboard}></FontAwesomeIcon>;

  //collecting email from user input field
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  //collecting password from password field
  const handleNotes = (e) => {
    setNotes(e.target.value);
  };
  useEffect(() => {
    fetch(`http://localhost:5000/subscription/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [user?.email]);

  useEffect(() => {
    fetch(`http://localhost:5000/notes/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setAddedNote(data));
  }, [user?.email]);

  //checking free limit
  console.log(addedNote);
  const matchDate = new Date();
  const mDate = matchDate.toLocaleDateString();
  let sum = 0;
  let i;
  for (i = 0; i < addedNote.length; i++) {
    if (addedNote.tDate === mDate) {
      sum++;
    }
  }
  console.log(sum);

  //submitting the info for login
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const tTime = date.toLocaleTimeString();
    const tDate = date.toLocaleDateString();

    const data = {
      email,
      title,
      notes,
      tTime,
      tDate,
    };

    if (item.length > 0) {
      fetch(`http://localhost:5000/notes`, {
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
            alert("Ops Something went wrong. Try again");
          }
        });
    } else {
      if (sum === 5 && tDate === addedNote.tDate) {
        alert(
          "You've already used 5 notes today. Buy subscription to get more."
        );
      } else {
        fetch(`http://localhost:5000/notes`, {
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
              alert("Ops Something went wrong. Try again");
            }
          });
      }
    }

    console.log(data, item, addedNote);

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
              src="https://image.freepik.com/free-vector/notebook-concept-illustration_114360-387.jpg"
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
                  <Form.Label>Title</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">
                      {emailLogo}
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      onBlur={handleTitle}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} className="w-100" md="4">
                  <Form.Label>Notes</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">
                      {noteLogo}
                    </InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      onBlur={handleNotes}
                      placeholder="Your note"
                      style={{ height: "100px" }}
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

export default AddNotes;
