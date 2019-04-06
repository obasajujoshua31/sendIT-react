import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import logOutUser from "../../actions/user/signout";
import { isLoggedOut, signInSuccess, signUpSuccess } from "../../types/types";

const GuestLink = (
  <React.Fragment>
    <li className="nav-item">
      <Link className="nav-link" to="/">
        Home <span className="sr-only">(current)</span>
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/about">
        About Us
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/signup">
        Create Account
      </Link>
    </li>{" "}
    <li className="nav-item">
      <Link className="nav-link" to="/login">
        Sign in
      </Link>
    </li>
  </React.Fragment>
);

export const Navbar = ({ logout, singInStatus, history, role }) => {
  const singInUserLink = (
    <React.Fragment>
      {role ? (
        <li className="nav-item">
          <Link to="/admin-dashboard" className="nav-link">
            Parcel Summary
          </Link>
        </li>
      ) : (
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            Parcel Summary
          </Link>
        </li>
      )}
      {!role && (
        <li className="nav-item">
          <Link to="/create-order" className="nav-link">
            Send Parcels
          </Link>
        </li>
      )}
      {role ? (
        <li className="nav-item">
          <Link to="/admin-view-orders" className="nav-link">
            View Orders
          </Link>
        </li>
      ) : (
        <li className="nav-item">
          <Link to="/view-orders" className="nav-link">
            View Orders
          </Link>
        </li>
      )}

      <li className="nav-item">
        <a
          className="nav-link"
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
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#806B75" }}
    >
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          {singInStatus === signInSuccess || singInStatus === signUpSuccess
            ? singInUserLink
            : GuestLink}
        </ul>
      </div>
    </nav>
  );
};
export const mapStateToProps = ({ users }) => ({
  singInStatus: users.singInStatus,
  role: users.role
});

export const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logOutUser(isLoggedOut))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
