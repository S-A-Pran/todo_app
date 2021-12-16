import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import useAuth from "../../../hook/useAuth";
import NavBar from "../../shared/NavBar/NavBar";
import Notes from "../Notes/Notes";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    fetch(`http://localhost:5000/notes/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, [user?.email]);
  return (
    <>
      <NavBar></NavBar>

      <Container className="mt-3">
        <h2 className="text-primary fw-bold text-center p-2 rounded-pill shadow-lg mb-4 mt-3">
          Your Total Notes {notes.length}
        </h2>
        <Row lg={3}>
          {/* looping for taking each note */}
          {notes.map((note) => (
            <Notes key={note._id} note={note}></Notes>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AllNotes;
