// add Property
import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentialsForm } from '@utils/fetchHelper';
import './addProperty.scss';
import Layout from '@src/layout';

class AddProperty extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      title: '',
      description: '',
      city: '',
      country: '',
      property_type: '',
      price_per_night: 0,
      max_guests: 0,
      bedrooms: 0,
      beds: 0,
      baths: 0,
      images: [],
      user_id: 0
      }

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  componentDidMount() {
    fetch('api/authenticated', {
    })
    .then(response => {
      if (response.status == 200) {
        return response.json()
      } else {
        window.location = '/login'
      }
    })
    .then(data => {
      this.setState({user_id: data.user_id})
    })
  }

  handleChange(e) {
    e.preventDefault();
    let newValue = e.target.value 
    let formItem = e.target.name   
    this.setState({[`${formItem}`]: newValue});
  }

  handleSubmit(e) {
    e.preventDefault();
    let filePicker = document.querySelector('#fileInput')
    let formData = new FormData();
    for (let i = 0; i < filePicker.files.length; i++) {
      formData.append('property[images][]', filePicker.files[i]);
    }
    formData.set('property[description]', this.state.description); 
    formData.set('property[city]', this.state.city); 
    formData.set('property[country]', this.state.country); 
    formData.set('property[property_type]', this.state.property_type); 
    formData.set('property[price_per_night]', this.state.price_per_night); 
    formData.set('property[max_guests]', this.state.max_guests); 
    formData.set('property[bedrooms]', this.state.bedrooms ); 
    formData.set('property[beds]', this.state.beds); 
    formData.set('property[baths]', this.state.baths); 
    formData.set('property[title]', this.state.title ); 
    formData.set('property[user_id]', this.state.user_id); 
    fetch("/api/properties", safeCredentialsForm ({
       method: "POST",
       body: formData
    }))
    .then(response => {
      if (response.status == 200 ){
        window.location = "/myProperties"
      } 
    })
  }
  

  render () {
    return ( 
      <Layout>
        <div>
          <h3 className="mt-3 text-secondary">Please use this form to create your property listing</h3>
          <form className="form-group bg-light" onSubmit={this.handleSubmit}>
            <div>
              <label>Title:</label>
              <input type="text" name="title" className="form-control" required onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Property Description:</label>
                <textarea type="text" name="description" className="form-control" rows="3" required onChange={this.handleChange}></textarea>
            </div>
            <div>
              <label>Location City:</label>
              <input type="text" name="city" className="form-control" required onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Location Country:</label>
              <input type="text" name="country" className="form-control" required onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Property Type:</label>
              <input type="text" name="property_type" className="form-control" required onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Price Per Night: (U.S. Dollars)</label>
              <input type="number" name="price_per_night" className="form-control" required onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Max Number of Guests:</label>
              <input type="number" name="max_guests" className="form-control" required onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Number of Bathrooms:</label>
              <input type="number" name="bathrooms" className="form-control" required onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Number of Bedrooms:</label>
              <input type="number" name="bedrooms" className="form-control" required onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Number of Beds:</label>
              <input type="number" name="beds" className="form-control" required onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Number of Baths:</label>
              <input type="number" name="baths" className="form-control" required onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Property Images:</label>
              <input type="file" id="fileInput" multiple name="images" required className="ml-3"></input>
            </div>
            <div>
              <button type="submit" className="btn btn-success mt-2" >Add Property</button>
            </div>
          </form>
        </div>
      </Layout>
    )}

};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <AddProperty />,
    document.body.appendChild(document.createElement('div')),
  )})