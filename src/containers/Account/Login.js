import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { toast } from "react-toastify";
import signUserIn from "../../actions/user/signin";
import { signInSuccess, signInFailure } from "../../types/types";
import { withRouter } from "react-router-dom";
// import Spinner from "react-spinkit";
import isValidLoginForm from "../../validations/loginValidator";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      isShowSpinner: false,
      formErrors: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.singInStatus === signInSuccess) {
      if (nextProps.role) {
        this.props.history.push("/admin-dashboard/");
      } else {
        this.props.history.push("/view-orders/");
      }
      toast.success("You are successfully logged in");
    }
    if (nextProps.errorMessage) {
      toast.error(nextProps.errorMessage);
    }
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (!isValidLoginForm(this.state)) {
      return this.setState({
        formErrors: "Invalid Credentials!"
      });
    }
    // this.ShowSpinner();
    this.setState({ email: "", password: "" });
    this.props.signIn({ email, password });
  }

  render() {
    const { email, password, isShowSpinner, formErrors } = this.state;
    // const isflyingSpinner = <Spinner name="three-bounce" color="orange" />;

    return (
      <Fragment>
        <div className="account-wrapper">
          <div className="form-wrapper sign-wrapper">
            <form onSubmit={this.handleSubmit} noValidate>
              {formErrors.length > 0 && (
                <span className="errorMsg">{formErrors}</span>
              )}
              {/* {isShowSpinner ? isflyingSpinner : ""} */}
              <h2>Sign In</h2>
              {this.props.errorMessage.length > 0 && (
                <span className="errorMsg">{this.props.errorMessage}</span>
              )}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="yourname@example.com"
                  onChange={this.handleChange}
                  value={email}
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="your password"
                  onChange={this.handleChange}
                  value={password}
                  name="password"
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}
export const mapStateToProps = ({ users }) => ({
  singInStatus: users.singInStatus,
  errorMessage: users.errorMessage,
  role: users.role,
  errMsg: users.errMsg
});

export const mapDispatchToProps = dispatch => {
  return {
    signIn: user => dispatch(signUserIn(user))
  };
};

Login.propTypes = {
  signIn: propTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
