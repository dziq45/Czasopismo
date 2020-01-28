import React, { useState, useRef, useEffect } from 'react';
import {PayPalButton} from 'react-paypal-button-v2'
const Payment = (props) => {
  const [paidFor, setPaidFor] = useState(false)
  const [loaded, setLoaded] = useState(false)


    return (
    <PayPalButton
    options={{
      clientId: "AQjypYxpwpLaNDwbfQ2eVLdZlVxYANRcMMQufD1ym1EPe6gmSpF-jYlwDeXnCUQt6xYa0Sk59hFIKWa5"
    }}
    createOrder={(data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            currency_code: "USD",
            value: props.wartosc
          }
        }],
      });
    }}
    onApprove={(data, actions) => {
      // Capture the funds from the transaction
      return actions.order.capture().then(function(details) {
        // Show a success message to your buyer
        alert("Transaction completed by " + details.payer.name.given_name);

        // OPTIONAL: Call your server to save the transaction
        return fetch("/paypal-transaction-complete", {
          method: "post",
          body: JSON.stringify({
            orderID: data.orderID
          })
        });
      });
    }}
  />
);
}
 
export default Payment;