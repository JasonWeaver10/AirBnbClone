// layout.js
import React from 'react';

const Layout = (props) => {
  

    return (
    <div>
      <div>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <a href="/"><span className="navbar-brand mb-0 h1 text-danger">Airbnb</span></a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li>
                <a href="/myProperties" className='nav-link'>My Properties</a>
              </li>
              <li>
                <a href="/myBookings" className='nav-link'>My Bookings</a>
              </li>
              <li>
                <a href="/addProperty" className='nav-link'>Add Property</a>
              </li>
              <li>
                <a href="/logout" className='nav-link'>Logout</a>
              </li>
            </ul>
          </div>
        </nav>
        {props.children}
        <footer className="p-3 bg-light">
          <div>
            <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
          </div>
        </footer>
      </div>
    </div>
    );
}



export default Layout;
