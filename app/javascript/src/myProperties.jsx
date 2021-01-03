// My Bookings
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import './myProperties.scss';

class MyProperties extends React.Component {
  constructor(props) {
    super(props); 
      this.state = {
      properties: [],
      loading: true,
      propertyLength: 0,
      }
      this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    fetch('/api/authenticated')
          .then(response => {
            if (response.ok == false) {
              window.location = "/login"
            }
          })
    
    fetch('./api/myProperties', safeCredentials())
          .then(handleErrors)
          .then(data => {
            this.setState({
              properties: data.properties,
              propertyLength: data.properties.length,
              loading: false,
            })
          })
  }

  handleDelete(e) {
    let propNum = e.target.id
    fetch(`/api/properties/${propNum}`, safeCredentials ({
      method: "DELETE",
   }))
   window.location = '/myProperties'

  }


  render () {
    const { properties, loading, propertyLength } = this.state;
    return (
      <Layout>
        <div className="container pt-4">
          <h4 className="mb-1">You have {propertyLength} properties currently listed</h4>
          <p className="text-secondary mb-3 d-inline"></p>
          <div className="row">
            {properties.map(property => {
              if (property) { 
              return (
                <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                  <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                    <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.images[0].image})` }} />
                    <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                    <h6 className="mb-0">{property.title}</h6>
                    <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                  </a>
                  <a href={`/propertyBookings/${property.id}`} className="nav-link">View Bookings</a>
                  <a href={`/editProperty/${property.id}`} className="nav-link">Edit Property</a>
                  <button id={property.id} className="btn btn-danger" onClick={this.handleDelete}>Remove Property</button> 
                </div>
              )
              } else {
                return (
                  <h1>You have not added any properties!</h1>
                )
              }
            })}
          </div>
          {loading && <p>loading...</p>}
          <div className="text-center">
          </div>
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MyProperties />,
    document.body.appendChild(document.createElement('div')),
  )})