import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import loadUserParcels from "../../actions/parcels/admin/getParcels";
import { connect } from "react-redux";
import organiseOrders from "../../helpers/organise";

import {
  signInFailure,
  signUpFailure,
  signInSuccess,
  signUpSuccess,
  isLoggedOut
} from "../../types/types";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authStatus: signInFailure,
      role: false
    };
  }
  componentDidMount() {
    this.props.loadParcels();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.authStatus !== prevState.authStatus) {
      if (
        nextProps.authStatus === signInFailure ||
        nextProps.authStatus === signUpFailure ||
        nextProps.authStatus == isLoggedOut
      ) {
        nextProps.history.push("/login");
      }
      return null;
    }
    return null;
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.props.userParcels.data) {
      this.setState({ parcels: this.props.userParcels.data });
    }
  }
  render() {
    let placed = 0;
    let delivered = 0;
    let cancelled = 0;
    let transiting = 0;

    if (Object.keys(this.props.userParcels).length > 0) {
      placed = organiseOrders(this.props.userParcels).placed;
      delivered = organiseOrders(this.props.userParcels).delivered;
      cancelled = organiseOrders(this.props.userParcels).cancelled;
      transiting = organiseOrders(this.props.userParcels).transiting;
    }
    return (
      <React.Fragment>
        <div className="account-wrapper">
          <div className="box-group">
            <div className="container">
              <div className="boxes">
                <div className="box">
                  <span className="content">Delivered Orders</span>
                  <span className="content-summary">{delivered}</span>
                </div>
                <div className="box">
                  <span className="content">Placed Orders</span>
                  <span className="content-summary">{placed}</span>
                </div>
              </div>
              <div className="boxes">
                <div className="box">
                  <span className="content">Cancelled Orders</span>

                  <span className="content-summary">{cancelled}</span>
                </div>
                <div className="box">
                  <span className="content">Transiting Orders</span>
                  <span className="content-summary">{transiting}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  loadParcels: () => dispatch(loadUserParcels())
});

const mapStateToProps = ({ parcels, users }) => ({
  userParcels: parcels.parcels,
  authStatus: users.singInStatus
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminDashboard));
