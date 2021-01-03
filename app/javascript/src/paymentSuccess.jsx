// Payment Success
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors, getAuthenticityToken } from '@utils/fetchHelper';
import './paymentSuccess.scss';

class PaymentSuccess extends React.Component {
  constructor(props) {
    super(props); 
      this.state = {
      booking: {},
      property: {}
      }
  }

  componentDidMount() {
    const re = (/\d+/)
    const bookingId = window.location.pathname.match(re, '').join();
    fetch(`/api/paymentSuccess/${bookingId}` )
          .then(handleErrors)
          .then(data => {
            console.log(data.booking)
            this.setState({
              booking: data.booking,
              property: data.booking.property,
            })
          })
  }

  
  render () {
    const { booking, property } = this.state;
    return (
      <Layout>
        <div className="container pt-4">
          <h2>Your Booking is Complete, Payment was Successful!</h2>
          <h4>Here is your booking information</h4>
          <h3>Property Title: {property.title}</h3>
          <h5 className="text-secondary">Booking start date: {booking.start_date}</h5>
          <h5 className="text-secondary">Booking end date: {booking.end_date}</h5>
          <a href={`/property/${property.id}`} className="text-body text-decoration-none">View Property</a>
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <PaymentSuccess />,
    document.body.appendChild(document.createElement('div')),
  )})