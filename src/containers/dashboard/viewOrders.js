import React, { Component } from "react";
import loadUserParcels from "../../actions/parcels/getParcels";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Spinner from "react-spinkit";
import {
  signInFailure,
  signUpFailure,
  signInSuccess,
  signUpSuccess
} from "../../types/types";
import Order from "./order";
import EditModal from "../../components/modals/edit";
import ReactModal from "react-modal";
ReactModal.setAppElement("#app");
ReactModal.defaultStyles.overlay.backgroundColor = "cornsilk";

class ViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcels: [],
      showModal: false,
      parcelId: ""
    };
    this.onHandleViewOrder = this.onHandleViewOrder.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onHandleViewOrder(parcelId) {
    this.setState({
      showModal: true,
      parcelId,
      authStatus: signInSuccess || signUpSuccess
    });
  }
  closeModal() {
    this.setState({ showModal: false });
  }
  componentDidMount() {
    this.props.loadParcels();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.authStatus !== prevState.authStatus) {
      if (
        nextProps.authStatus === signInFailure ||
        nextProps.authStatus === signUpFailure
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
    if (!this.state.parcels.length) {
      return <Spinner name="three-bounce" color="orange" />;
    }
    return (
      <React.Fragment>
        <div className="view-order-container">
          <h1>Your Orders</h1>
          <table className="table" align="center">
            <thead>
              <tr>
                <td>Parcel Id</td>
                <td>Parcel Name</td>
                <td>Pick Up Location</td>
                <td>Destination</td>
                <td>Sent On</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {this.state.parcels.map(value => {
                return (
                  <React.Fragment key={value.parcel_id}>
                    <Order
                      key={value.parcel_id}
                      parcel={value}
                      onHandleViewOrder={this.onHandleViewOrder}
                    />
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        {this.state.showModal && (
          <EditModal
            show={this.state.showModal}
            handleCloseModal={this.closeModal}
            parcelId={this.state.parcelId}
            role={false}
            header={"Change Destination"}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadParcels: () => dispatch(loadUserParcels())
});

const mapStateToProps = ({ parcels, users }) => ({
  userParcels: parcels.parcels,
  authStatus: users.singInStatus,
  role: users.role
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewOrders));
