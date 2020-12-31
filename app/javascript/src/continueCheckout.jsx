// continueCheckout.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class ContinueCheckout extends React.Component {
  constructor(props) {
    super(props)
   
  }
  
  resumeCheckout = (e) => {
    e.preventDefault();
    const checkout_session_id = this.props.checkout_session_id
    return fetch(`/api/charges?booking_id=${checkout_session_id}&cancel_url=${window.location.pathname}`, safeCredentials({
      method: 'POST',
    }))
      .then(handleErrors)
      .then(response => {
        const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);
  
        stripe.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: response.charge.checkout_session_id,
        }).then((result) => {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render () {
      return (
       <div>
         <button className="btn btn-success" onClick={this.resumeCheckout}>Continue Checkout</button>
       </div>
      );
    };
  }

export default ContinueCheckout;