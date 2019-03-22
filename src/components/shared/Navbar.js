import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import logOutUser from "../../actions/user/signout";
import { isLoggedOut, signInSuccess, signUpSuccess } from "../../types/types";

const guestLink = (
  <React.Fragment>
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
  </React.Fragment>
);

const Navbar = ({ logout, singInStatus, history, role }) => {
  const singInUserLink = (
    <React.Fragment>
      {role ? (
        <li>
          <Link to="/admin-dashboard">Parcel Summary</Link>
        </li>
      ) : (
        <li>
          <Link to="/dashboard">Parcel Summary</Link>
        </li>
      )}
      {!role && (
        <li>
          <Link to="/create-order">Send Parcels</Link>
        </li>
      )}
      {role ? (
        <li>
          <Link to="/admin-view-orders">View Orders</Link>
        </li>
      ) : (
        <li>
          <Link to="/view-orders">View Orders</Link>
        </li>
      )}

      <li>
        <a
          onClick={() => {
            logout();
            history.push("/");
          }}
        >
          Logout
        </a>
      </li>
    </React.Fragment>
  );
  return (
    <div>
      <div className="navbar-wrapper">
        <div className="container">
          <div className="navbar-container">
            <li className="bars-icon">
              <i className="fas fa-bars" />
            </li>
            <nav className="navbar">
              <ul>
                {singInStatus === (signInSuccess || signUpSuccess)
                  ? singInUserLink
                  : guestLink}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ users }) => ({
  singInStatus: users.singInStatus,
  role: users.role
});

const mapDispatchToProps = () => dispatch => ({
  logout: () => dispatch(logOutUser(isLoggedOut))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
