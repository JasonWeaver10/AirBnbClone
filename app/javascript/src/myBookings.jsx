// My Bookings
import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import './myBookings.scss';
import Layout from '@src/layout';
import ContinueCheckout from '@src/continueCheckout';

class MyBookings extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        bookings: []
      }

    }

  componentDidMount() { 
    fetch('/api/authenticated')
          .then(response => {
            if (response.ok == false) {
              window.location = "/login"
            }
          })
    fetch(`http://localhost:3000/api/userBookings/`, safeCredentials())
          .then(handleErrors)
          .then(data => {
            this.setState({
              bookings: data.bookings,
            })

          })
  }

  
  render () {
    const { bookings } = this.state;
    return (
        <Layout>
          <div className="container pt-4">
          <h4 className="mb-1">Here are all of your current bookings</h4>
          <div className="row mt-3">
            {bookings.map(function(booking, index) {
              if (booking.is_paid) {
                return (
                  <div key={index} className="col-6 col-lg-4 mb-4     property">
                    <p className="text-uppercase mb-0 text-secondary"><b>
                      {booking.property_title}</b></p>
                    <p className="text-uppercase mb-0 text-secondary"><b>
                      Start Date: {booking.start_date}</b></p>
                    <p className="text-uppercase mb-0 text-secondary"><b>
                      End Date: {booking.end_date}</b></p>
                    <a href={`http://localhost:3000/property/${booking.property_id}`} className="text-decoration-none">
                      View Property Listing</a>
                    <p className="text-uppercase text-secondary"><b>    Booking is fully Paid</b></p>
                  </div>
                )
              } else {
                return (
                  <div key={index} className="col-6 col-lg-4 mb-4 property">
                    <p className="text-uppercase mb-0 text-secondary"><b>
                      {booking.property_title}</b></p>
                    <p className="text-uppercase mb-0 text-secondary"><b>
                      Start Date: {booking.start_date}</b></p>
                    <p className="text-uppercase mb-0 text-secondary"><b>
                      End Date: {booking.end_date}</b></p>
                    <a href={`http://localhost:3000/property/${booking.property_id}`} className="text-decoration-none">
                      View Property Listing</a><br/>
                    <ContinueCheckout checkout_session_id={booking.checkout_session_id}/>
                  </div>
                )
              }
              
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MyBookings />,
    document.body.appendChild(document.createElement('div')),
  )})