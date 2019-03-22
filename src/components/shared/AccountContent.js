import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signInSuccess } from "../../types/types";
import loadUserParcels from "../../actions/parcels/getParcels";

class AccountContent extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.loadParcels();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.singInStatus === signInSuccess) {
      this.props.history.push("/create-order");
    } else {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="service-information">
          <h1>
            <span>Just Call </span>(0908754647846)
          </h1>
          <p>We are always ready for your service</p>
          <button onClick={this.handleClick}>SendIT Today</button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  singInStatus: users.singInStatus
});
const mapDispatchToProps = dispatch => ({
  loadParcels: () => dispatch(loadUserParcels())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountContent));
