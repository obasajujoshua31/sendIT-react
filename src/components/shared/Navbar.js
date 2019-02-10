import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <div className="navbar-wrapper">
        <div className="container">
          <div className="navbar-container">
            <li className = 'bars-icon'>
              <i className="fas fa-bars" />
            </li>
            <nav className="navbar">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/signup">Create Account</Link>
                </li>
                <li>
                  <Link to="/login">Sign In</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
