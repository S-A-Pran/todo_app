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

  //fetching subscriptions
  useEffect(() => {
    fetch(
      `https://blooming-beach-91976.herokuapp.com/subscription/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, []);

  // fetching all notes
  useEffect(() => {
    fetch(`https://blooming-beach-91976.herokuapp.com/notes/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setAddedNote(data));
  }, []);

  //collecting title from user input field
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  //collecting note from password field
  const handleNotes = (e) => {
    setNotes(e.target.value);
  };

  console.log(item, addedNote);

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

    //calling checklist for free user
    checkLimit(data);

    // const found = addedNote?.filter(f => f.tDate === tDate);
    // console.log(found);

    //dividing by subcription limit

    e.target.reset();
  };

  //checklimit for free user
  const checkLimit = (data) => {
    const { email, title, notes, tTime, tDate } = data;
    const found = addedNote?.filter((f) => f.tDate === tDate);

    if (item.length > 0) {
      fetch(`https://blooming-beach-91976.herokuapp.com/notes`, {
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
      if (found.length === 4) {
        return alert(
          "You've already used 3 notes today. Buy subscription to get more."
        );
      } else {
        fetch(`https://blooming-beach-91976.herokuapp.com/notes`, {
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
