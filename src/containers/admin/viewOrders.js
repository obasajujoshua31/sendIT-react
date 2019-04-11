import React, { Component } from "react";
import loadUserParcels from "../../actions/parcels/admin/getParcels";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Spinner from "react-md-spinner";
import {
  signInFailure,
  signUpFailure,
  signInSuccess,
  signUpSuccess
} from "../../types/types";
import Order from "../dashboard/order";
import EditModal from "../../components/modals/edit";
import ReactModal from "react-modal";

export class AdminViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcels: [],
      showModal: false,
      parcelId: "",
      isLoading: true
    };

    this.onHandleViewOrder = this.onHandleViewOrder.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    if (process.env.NODE_ENV !== "test") {
      ReactModal.setAppElement("#app");
      ReactModal.defaultStyles.overlay.backgroundColor = "cornsilk";
    }
  }

  onHandleViewOrder(parcelId) {
    this.setState({
      showModal: true,
      parcelId
    });
  }

  closeModal() {
    this.setState({ showModal: false });
  }
  componentDidMount() {
    this.props.loadParcels();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.userParcels) {
        this.setState({ isLoading: false });
        this.setState({ parcels: this.props.userParcels });
      }
      if (
        this.props.authStatus === signInFailure ||
        this.props.authStatus === signUpFailure
      ) {
        this.props.history.push("/login");
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

    return (
      <React.Fragment>
        <div className="view-order-container">
          <h1>All Available Orders</h1>
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
            role={true}
          />
        )}
      </React.Fragment>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  loadParcels: () => dispatch(loadUserParcels())
});

export const mapStateToProps = ({ parcels, users }) => ({
  userParcels: parcels.parcels,
  authStatus: users.singInStatus,
  role: users.role
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminViewOrders));
