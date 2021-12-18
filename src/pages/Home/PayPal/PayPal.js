import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
function PayPal({ item }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: item.price,
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    //console.log(data);
    //item to be stored in the database after confirming
    const dataStore = {
      ...item,
      ...data,
      email: user.email,
    };
    console.log(dataStore);
    // posting the buying info
    fetch("https://blooming-beach-91976.herokuapp.com/subscription", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataStore),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Order Placed Successfully");
          navigate("mysubscription");
        }
      });
    return actions.order.capture();
  };

  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

export default PayPal;
