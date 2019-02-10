import React, { Component } from "react";
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const isValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(
    value => value.length > 0 && (valid = false)
  );

  Object.values(rest).forEach(value => value.length === 0 && (valid = false));
  return valid;
};
class CreateAccount extends Component {
  constructor() {
    super();
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
      confirmPassword: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    const { formErrors, password } = this.state;
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length > 2 ? "" : "First name cannot be less than 2 characters";
        break;
      case "lastName":
        formErrors.lastName =
          value.length > 2 ? "" : "Last name cannot be less than 2 characters";
        break;
      case "email":
        formErrors.email = emailRegex.test(value) ? "" : "Invalid Email";
        break;
      case "password":
        formErrors.password = value.length > 5 ? "" : "Weak Password";
        break;
      case "confirmPassword":
        formErrors.confirmPassword =
          value === password ? "" : "Password does not match";
    }
    this.setState({ [name]: value }, () => console.log(this.state));
  }
  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      formErrors
    } = this.state;

    return <React.Fragment>
        <div className="account-wrapper">
          <div className="form-wrapper create-wrapper">
            <form onSubmit={this.handleSubmit} noValidate>
              <h2>Create Account</h2>
              <div className="form-inline">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input className={formErrors.firstName.length > 0 ? "error" : ""} type="text" placeholder="First Name" name="firstName" value={firstName} onChange={this.handleChange} />
                  {formErrors.firstName.length > 0 && <span className="errorMsg">
                      {formErrors.firstName}
                    </span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input className={formErrors.lastName.length > 0 ? "error" : ""} type="text" placeholder="last Name" name="lastName" value={lastName} onChange={this.handleChange} />
                  {formErrors.lastName.length > 0 && <span className="errorMsg">
                  {formErrors.lastName}  </span>}
                </div>
                
                
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className={formErrors.email.length > 0 ? "error" : ""} type="email" placeholder="yourname@example.com" name="email" value={email} onChange={this.handleChange} />
              {formErrors.email.length > 0 && (<span className='errorMsg'>{formErrors.email}</span>)} 
              </div>
           
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input className={formErrors.password.length > 0 ? "error" : ""} type="password" placeholder="password" name="password" value={password} onChange={this.handleChange} />
              {formErrors.password.length > 0 && (<span className='errorMsg'>{formErrors.password}</span>)} 
              </div>
            
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input className={formErrors.confirmPassword.length > 0 ? "error" : ""} type="password" placeholder="confirm password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} />
              {formErrors.confirmPassword.length > 0 && (<span className='errorMsg'>{formErrors.confirmPassword}</span>)} 
              </div>
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </React.Fragment>;
  }
}
export default CreateAccount;
