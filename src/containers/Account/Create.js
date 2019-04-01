import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "react-md-spinner";
import { withRouter } from "react-router-dom";
import validateCreateForm, { isValid } from "../../validations/createValidator";
import registerUser from "../../actions/user/signup";
import { signUpSuccess } from "../../types/types";
import { toast } from "react-toastify";

export class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isDeactivated: false,
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ formErrors: validateCreateForm(e, this.state) });
    this.setState({ [name]: value });
    if (!isValid(this.state)) {
      this.setState({ isDeactivated: true });
    } else {
      this.setState({ isDeactivated: false });
    }
  }

  handleSubmit(e) {
    const { firstName, lastName, email, password } = this.state;
    e.preventDefault();
    this.setState({ isLoading: true });
    if (!isValid(this.state)) {
      return this.setState({ isLoading: false });
    } else {
      this.props.signUp({ firstName, lastName, email, password });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.signUpStatus === signUpSuccess) {
        this.props.history.push("/view-orders/");
        toast.success("Welcome to SendIT");
      }
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="container">
          <div className="table-container">
            <div className="container-not-found">
              <Spinner />
            </div>
          </div>
        </div>
      );
    }

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      formErrors,
      isDeactivated
    } = this.state;
    return (
      <React.Fragment>
        <div className="account-wrapper">
          <div className="form-wrapper create-wrapper">
            <form onSubmit={this.handleSubmit} noValidate>
              <h2>Create Account</h2>

              <div className="form-oneline">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    className={formErrors.firstName.length > 0 ? "error" : ""}
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleChange}
                    required
                  />
                  {formErrors.firstName.length > 0 && (
                    <span className="errorMsg">{formErrors.firstName}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    className={formErrors.lastName.length > 0 ? "error" : ""}
                    type="text"
                    placeholder="last Name"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleChange}
                    required
                  />
                  {formErrors.lastName.length > 0 && (
                    <span className="errorMsg">{formErrors.lastName} </span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className={
                    formErrors.email.length > 0 ||
                    this.props.errorMsg.length > 0
                      ? "error"
                      : ""
                  }
                  type="email"
                  placeholder="yourname@example.com"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  required
                />
                {this.props.errorMsg.length > 0 && (
                  <span className="errorMsg">{this.props.errorMsg}</span>
                )}
                {formErrors.email.length > 0 && (
                  <span className="errorMsg">{formErrors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className={formErrors.password.length > 0 ? "error" : ""}
                  type="password"
                  placeholder="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  required
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMsg">{formErrors.password}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  className={
                    formErrors.confirmPassword.length > 0 ? "error" : ""
                  }
                  type="password"
                  placeholder="confirm password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  required
                />
                {formErrors.confirmPassword.length > 0 && (
                  <span className="errorMsg">{formErrors.confirmPassword}</span>
                )}
              </div>
              <button hidden={isDeactivated} type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export const mapStateToProps = ({ users }) => {
  return {
    signUpStatus: users.signUpStatus,
    errorMsg: users.errorMsg
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    signUp: user => dispatch(registerUser(user))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateAccount));
