import React, { Component } from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import loadUserParcels from "../../actions/parcels/getParcels";
import { signInFailure, signUpFailure } from "../../types/types";
import organiseOrders from "../../helpers/organise";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadParcels();
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.authStatus === signInFailure ||
      nextProps.authStatus === signUpFailure
    ) {
      this.props.history.push("/login");
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
)(withRouter(Dashboard));
