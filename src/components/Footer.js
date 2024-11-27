import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'; // Assuming you have a separate CSS file for Footer styling

function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          {/* Left side - About link */}
          <div className="col-md-6">
            <Link className="nav-link text-muted" to="/about">About</Link>
          </div>

          {/* Right side - Company details */}
          <div className="col-md-6 d-flex justify-content-end">
            <span className="text-muted">© 2024 UCampus, Inc. | All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
