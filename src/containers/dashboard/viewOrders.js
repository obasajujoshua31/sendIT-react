import React, { Component } from "react";
import loadUserParcels from "../../actions/parcels/getParcels";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Spinner from "react-md-spinner";
import {
  signInFailure,
  signUpFailure,
  signInSuccess,
  signUpSuccess
} from "../../types/types";
import Order from "./order";
import EditModal from "../../components/modals/edit";
import ReactModal from "react-modal";

export class ViewOrders extends Component {
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
  componentWillMount() {
    if (process.env.NODE_ENV !== "test") {
      ReactModal.setAppElement("#app");
      ReactModal.defaultStyles.overlay.backgroundColor = "cornsilk";
    }
  }

  componentDidMount() {
    this.props.loadParcels(this.props.history);
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
    if (!this.state.parcels.length) {
      return (
        <div className="container">
          <div className="table-container">
            <div className="container-not-found">
              <h1>You are Welcome to SendIT Courier Services</h1>
              <h1>You don't have any parcels yet</h1>
              <h1>
                <Link to="/create-order">Click here to create a Parcel</Link>
              </h1>
            </div>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="container">
          <div className="table-container">
            <h1
              style={{
                textAlign: "center",
                paddingTop: "20px",
                color: "#806B75"
              }}
            >
              Your Orders
            </h1>
            <table className="table" align="center">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Parcel Id</th>
                  <th scope="col">Parcel Name</th>
                  <th scope="col">Pick Up Location</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Sent On</th>
                  <th scope="col">Status</th>
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

export const mapDispatchToProps = dispatch => ({
  loadParcels: () => dispatch(loadUserParcels())
});

export const mapStateToProps = ({ parcels, users }) => ({
  userParcels: parcels.parcels,
  authStatus: users.singInStatus,
  role: users.role,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewOrders));
