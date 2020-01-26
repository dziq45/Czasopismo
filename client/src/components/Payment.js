import React, { useState, useRef, useEffect } from 'react';
import {PayPalButton} from 'react-paypal-button-v2'
const Payment = (props) => {
  const [paidFor, setPaidFor] = useState(false)
  const [loaded, setLoaded] = useState(false)
  let paypalRef = useRef()

    return (<PayPalButton
      amount="0.01"
      // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
      onSuccess={(details, data) => {
        alert("Transaction completed by " + details.payer.name.given_name);

        // OPTIONAL: Call your server to save the transaction
        return fetch("/paypal-transaction-complete", {
          method: "post",
          body: JSON.stringify({
            orderId: data.orderID
          })
        });
      }}
      options={{
        clientId: "AQjypYxpwpLaNDwbfQ2eVLdZlVxYANRcMMQufD1ym1EPe6gmSpF-jYlwDeXnCUQt6xYa0Sk59hFIKWa5"
      }}
    />
);
}
 
export default Payment;