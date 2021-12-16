import React from "react";
import { Carousel } from "react-bootstrap";
import "./TopBar.css";

const TopBar = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 item"
            src="https://image.freepik.com/free-vector/tiny-man-sitting-chair-with-laptop-checklist-background_74855-20395.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h2 className="text-dark fw-bold">List your emergency info</h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 item"
            src="https://image.freepik.com/free-psd/torn-hole-white-wall-paper-yellow-background_24972-376.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h2 className="text-dark fw-bold">
              Buy premium packs at 50% off now.
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 item"
            src="https://image.freepik.com/free-photo/coffee-list_23-2148475402.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h2 className="text-dark fw-bold">Organize yourself today.</h2>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default TopBar;
