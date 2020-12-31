// Property Bookings
import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import './propertyBookings.scss';
import Layout from '@src/layout';

class PropertyBookings extends React.Component {
  state = {
    bookings: [],
    bookingLength: 0
  }

  componentDidMount() { 
    const propertyId = window.location.pathname.replace('/propertyBookings/', '');
    fetch(`/api/propertyBookings/${propertyId}`)
          .then(handleErrors)
          .then(data => {
            this.setState({
              bookings: data.bookings,
              bookingLength: data.bookings.length
            })
          })
  }


  render () {
    const { bookings, bookingLength } = this.state;
    return (
        <Layout props={this.handleLogout}>
          <div className="container pt-4">
          <h4 className="mb-1">You have {bookingLength} current bookings for this property</h4>
          <div className="row mt-3">
          {bookings.map(function(booking, index) {
              if (booking.paid) {
                return (
                  <div key={index} className="col-6 col-lg-4 mb-4 property">
                    <p className="text-uppercase mb-0"><b>Customer Name: {booking.user.username}</b></p>
                    <p className="text-uppercase mb-0 text-secondary"><b>
                      Start Date: {booking.start_date}</b></p>
                    <p className="text-uppercase mb-0 text-secondary"><b>
                      End Date: {booking.end_date}</b></p>
                      <p className="text-uppercase mb-0 text-secondary"><b>
                      Paid: ✅ </b></p> 
                  </div>
                )
              } else {
                return (
                  <div key={index} className="col-6 col-lg-4 mb-4 property">
                    <p className="text-uppercase mb-0">Customer Name: {booking.user.username}</p>
                    <p className="text-uppercase mb-0 text-secondary"><b>
                      Start Date: {booking.start_date}</b></p>
                    <p className="text-uppercase mb-0 text-secondary"><b>
                      End Date: {booking.end_date}</b></p>
                      <p className="text-uppercase mb-0 text-secondary"><b>
                      Paid:  ❌ </b></p> 
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
    <PropertyBookings />,
    document.body.appendChild(document.createElement('div')),
  )})