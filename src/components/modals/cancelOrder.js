import React, { Component } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import cancelParcel from "../../actions/parcels/cancelParcel";
import Spinner from "react-md-spinner";

export class CancelParcelOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcel: [],
      showCancelModal: false
    };
    this.cancelParcel = this.cancelParcel.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  cancelParcel(e) {
    e.preventDefault();
    this.props.cancelParcelOrder(this.props.parcelId);
  }
  componentWillMount() {
    if (process.env.NODE_ENV !== "test") {
      ReactModal.setAppElement("#app");
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.parcelStatus) {
        this.props.history.push("/dashboard");
      }
    }
  }

  render() {
    const { show, closeCancel } = this.props;

    return (
      <ReactModal
        isOpen={show}
        contentLabel="Modal #1 Global Style Override Example"
        onRequestClose={closeCancel}
        overlayClassName="Overlay"
        className="editModal"
      >
        <div style={modalHeaderStyle}>
          <span style={spanStyle}>
            <i className="far fa-times-circle" onClick={closeCancel} />
          </span>
          <h3 style={modalHeadBrandStyle}>Form Cancellation Confirmation</h3>
        </div>
        <div style={modalBodyContainer}>
          <form onSubmit={this.cancelParcel} noValidate>
            <button style={buttonStyle}>Confirm Cancel Order</button>
          </form>
        </div>
      </ReactModal>
    );
  }
}

export const mapStateToProps = ({ parcels }) => ({
  parcelStatus: parcels.parcelStatus
});

export const mapDispatchToProps = dispatch => ({
  cancelParcelOrder: id => dispatch(cancelParcel(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CancelParcelOrder));

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

const modalBodyContainer = {
  padding: "10px",
  maxWidth: "100%",
  display: "flex",
  justifyContent: "center",
  alignItem: "center"
};
const buttonStyle = {
  position: "relative",
  margin: 0,
  padding: "10px 20px",
  backgroundColor: "#fd9b01",
  color: "white",
  border: "none",
  outline: "none"
};
