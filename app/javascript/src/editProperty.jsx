// add Property
import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentialsForm, safeCredentials, handleErrors } from '@utils/fetchHelper';
import './editProperty.scss';
import Layout from '@src/layout';

class EditProperty extends React.Component {
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
      // image_url: '',
      property_id: 0,
      images: []
      }

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
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
    if (filePicker.files.length > 0) {
      for (let i = 0; i < filePicker.files.length; i++) {
        formData.append('property[images][]', filePicker.files[i]);
      }
    }
    
    formData.set('property[title]', this.state.title ); 
    formData.set('property[description]', this.state.description); 
    formData.set('property[city]', this.state.city); 
    formData.set('property[country]', this.state.country); 
    formData.set('property[property_type]', this.state.property_type); 
    formData.set('property[price_per_night]', this.state.price_per_night); 
    formData.set('property[max_guests]', this.state.max_guests); 
    formData.set('property[bedrooms]', this.state.bedrooms ); 
    formData.set('property[beds]', this.state.beds); 
    formData.set('property[baths]', this.state.baths); 
    // formData.set('property[image_url]', this.state.image_url);
    console.log(formData);
    fetch(`/api/properties/${this.state.property_id}`, safeCredentialsForm ({
      method: "PUT",
      body: formData
    })).then((response) => {
     if (response.ok == true) {
       window.location = '/myProperties'
     } else {
       console.log(response.status);
     }
   })
    window.location = "/myProperties"
  }

  componentDidMount() {
    const propertyId = window.location.pathname.replace('/editProperty/', '');
    this.setState({property_id: propertyId})
    fetch(`/api/properties/${propertyId}`, safeCredentials ({

    }))
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        property_id: data.property.id,
        title: data.property.title,
        description: data.property.description,
        city: data.property.city,
        country: data.property.country,
        property_type: data.property.property_type,
        price_per_night: data.property.price_per_night,
        max_guests: data.property.max_guests,
        bedrooms: data.property.bedrooms,
        beds: data.property.beds,
        baths: data.property.baths,
        // images: data.property.images,
      })
    })
  }
  

  render () {
    return ( 
      <Layout>
        <div>
          <h3 className="mt-3 text-secondary">Please use this form to edit your property listing</h3>
          <form className="form-group bg-light" onSubmit={this.handleSubmit}>
            <div>
              <label>Title:</label>
              <input placeholder={this.state.title} type="text" name="title" className="form-control" onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Property Description:</label>
                <textarea type="text" name="description" className="form-control" rows="3" placeholder={this.state.description}onChange={this.handleChange}></textarea>
            </div>
            <div>
              <label>Location City:</label>
              <input type="text" name="city" className="form-control"  placeholder={this.state.city} onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Location Country:</label>
              <input type="text" name="country" className="form-control" placeholder={this.state.country} onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Property Type:</label>
              <input type="text" name="property_type" className="form-control" placeholder={this.state.property_type} onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Price Per Night: (U.S. Dollars)</label>
              <input type="number" name="price_per_night" className="form-control" placeholder={this.state.price_per_night} onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Max Number of Guests:</label>
              <input type="number" name="max_guests" className="form-control" placeholder={this.state.max_guests} onChange={this.handleChange}></input>

            </div>
            <div>
              <label>Number of Bedrooms:</label>
              <input type="number" name="bedrooms" className="form-control" placeholder={this.state.bedrooms} onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Number of Beds:</label>
              <input type="number" name="beds" className="form-control" placeholder={this.state.beds} onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Number of Baths:</label>
              <input type="number" name="baths" className="form-control" placeholder={this.state.baths} onChange={this.handleChange}></input>
            </div>
            <div>
              <label>Images:</label>
              <input type="file" id="fileInput" multiple name="images"  className="ml-3"></input>
            </div>
            <div>
              <button type="submit" className="btn btn-success mt-2" >Update Property</button>
            </div>
          </form>
        </div>
      </Layout>
    )}

};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <EditProperty />,
    document.body.appendChild(document.createElement('div')),
  )})