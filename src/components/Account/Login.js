import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <React.Fragment>
          <div className ='account-wrapper'>
        <div className="form-wrapper sign-wrapper">
        <h2>Sign In</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder ='yourname@example.com' />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder = 'your password' />
          </div>
          <button type = 'submit'>Login</button>
        </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;