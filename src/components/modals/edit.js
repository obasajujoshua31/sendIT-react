import React, { Component } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import getOneParcel from "../../actions/parcels/getOneParcel";
import Spinner from "react-spinkit";
import EditDestinationModal from "./editDestination";
import CancelParcelOrder from "./cancelOrder";
import ChangeLocation from "./location";
import UpdateStatus from "./status";

ReactModal.setAppElement("#app");

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcel: [],
      showEditModal: false,
      showCancelModal: false
    };
    this.editParcel = this.editParcel.bind(this);
    this.closeParcelModal = this.closeParcelModal.bind(this);
    this.showCancelOrder = this.showCancelOrder.bind(this);
    this.closeCancelModal = this.closeCancelModal.bind(this);
  }

  editParcel() {
    this.setState({ showEditModal: true });
  }
  closeParcelModal() {
    this.setState({ showEditModal: false });
  }
  showCancelOrder() {
    this.setState({ showCancelModal: true });
  }
  closeCancelModal() {
    this.setState({ showCancelModal: false });
  }
  componentDidMount() {
    this.props.loadOneParcel(this.props.parcelId, this.props.role);
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.props.userParcel.data) {
      this.setState({ parcel: this.props.userParcel.data });
    }
  }
  render() {
    const { show, handleCloseModal } = this.props;

    if (!this.state.parcel.length) {
      return <Spinner name="three-bounce" color="orange" />;
    }

    const {
      parcel_name,
      destination,
      pick_up_location,
      sent_on,
      delivered_on,
      weight_metric,
      weight,
      status,
      present_location,
      parcel_id
    } = this.state.parcel[0];

    const modal = this.props.role ? (
      <ChangeLocation
        show={this.state.showEditModal}
        closeChangeLocation={this.closeParcelModal}
        parcelId={parcel_id}
        presentLocation={present_location}
      />
    ) : (
      <EditDestinationModal
        show={this.state.showEditModal}
        closeEdit={this.closeParcelModal}
        parcelId={parcel_id}
        destination={destination}
      />
    );

    const cancelModal = this.props.role ? (
      <UpdateStatus
        show={this.state.showCancelModal}
        closeCancel={this.closeCancelModal}
        parcelId={parcel_id}
        status={status}
      />
    ) : (
      <CancelParcelOrder
        show={this.state.showCancelModal}
        closeCancel={this.closeCancelModal}
        parcelId={parcel_id}
        status={status}
      />
    );

    const isCancellable = status === "PLACED" || status === "TRANSITING";
    return (
      <div>
        <ReactModal
          isOpen={show}
          contentLabel="Modal #1 Global Style Override Example"
          onRequestClose={handleCloseModal}
          overlayClassName="Overlay"
          className="Modal"
        >
          <div style={modalHeaderStyle}>
            <span style={spanStyle}>
              <i className="far fa-times-circle" onClick={handleCloseModal} />
            </span>
            <h3 style={modalHeadBrandStyle}>Order</h3>
          </div>
          <div style={modalBodyContainer}>
            <div style={modalBodyStyle}>
              <div style={itemStyle}>
                <label className="item-label">Name:</label>
                <span className="item-span">{parcel_name}</span>
              </div>
              <hr />
              <div style={itemStyle}>
                <label className="item-label">Pick Up Location:</label>
                <span className="item-span">{pick_up_location}</span>
              </div>
              <hr />
              <div style={itemStyle}>
                <label className="item-label">Destination:</label>
                <span className="item-span">{destination}</span>
              </div>
              <hr />
              <div style={itemStyle}>
                <label className="item-label">Status: </label>
                <span className="item-span">{status}</span>
              </div>
              <hr />
              <div style={itemStyle}>
                <label className="item-label">Sent On:</label>
                <span className="item-span">{sent_on}</span>
              </div>
              <hr />

              <div style={itemStyle}>
                <label className="item-label">Weight:</label>
                <span className="item-span">{`${weight}  ${weight_metric}`}</span>
              </div>
              <hr />
              <div style={itemStyle}>
                <label className="item-label">Delivered On:</label>
                <span className="item-span">{delivered_on}</span>
              </div>
              <hr />
              <div style={itemStyle}>
                <label className="item-label">Present Location:</label>
                <span className="item-span">{present_location}</span>
              </div>
            </div>
          </div>

          <div style={modalFooterStyle}>
            <button
              className="button edit"
              onClick={this.editParcel}
              hidden={!isCancellable}
            >
              {this.props.role ? "Change Location" : "Edit Parcel"}
            </button>
            <button
              className="button cancel"
              onClick={this.showCancelOrder}
              hidden={!isCancellable}
            >
              {this.props.role ? "Change Status" : "Cancel Parcel"}
            </button>
          </div>
        </ReactModal>
        {this.state.showEditModal && modal}
        {this.state.showCancelModal && cancelModal}
      </div>
    );
  }
}

const spanStyle = {
  fontSize: "1.8em",
  color: "white",
  cursor: "pointer",
  padding: 5,
  position: "absolute",
  right: 5,
  bottom: 5
};

const modalHeaderStyle = {
  padding: 15,
  backgroundColor: "#806B75",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItem: "center"
};
const modalHeadBrandStyle = {
  fontWeight: "bold",
  fontSize: "1.4rem",
  color: "white"
};
const modalBodyStyle = {
  width: "100%",
  padding: 10,
  border: "2px solid rgba(0, 0, 0, 0.3)",
  borderRadius: 10,
  marginTop: 30,
  overflow: "scroll",
  height: "300px"
};
const itemStyle = {
  display: "flex",
  padding: 5
};
const modalFooterStyle = {
  backgroundColor: "#e9e6e6",
  width: "100%",
  // position: "absolute",
  // bottom: "0",
  // height: "40px",
  display: "flex",
  padding: "10px 0px",
  justifyContent: "space-around"
};
const modalBodyContainer = {
  padding: "10px",
  maxWidth: "100%",
  display: "flex",
  justifyContent: "center",
  alignItem: "center"
};

const mapStateToProps = ({ parcels }) => ({
  userParcel: parcels.parcel
});

const mapDispatchToProps = dispatch => ({
  loadOneParcel: (parcelId, role) => dispatch(getOneParcel(parcelId, role))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Modal));
