// logout.jsx
import React from 'react';
import Layout from '@src/layout';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import './logout.scss';

class Logout extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        authenticated: false,
        user_id: 0
      }
      
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
          user_id: data.user_id
        })
      })
  }

  handleLogout(e) {
    e.preventDefault();
    const user = this.state.user_id
    fetch("/api/sessions/"+ user, safeCredentials ({
      method: "DELETE",
    }))
    this.setState({authenticated: false})
  }

  render () {
    const { authenticated } = this.state;
    if (authenticated) {
      return (
        <Layout>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                <div className="border p-4 logout_container">
                  <h5 className="mb-2">Are you sure you want to log out?</h5>
                  <button className="btn btn-danger logout_button" onClick={this.handleLogout}>Yes</button>
                  
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    };

    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border p-4 logout_container">
                <h4>You have successfully logged out!</h4>
                <a href="/login" className="nav-link">Log Back In</a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Logout />,
    document.body.appendChild(document.createElement('div')),
  )})