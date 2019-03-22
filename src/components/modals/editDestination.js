import React, { Component } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import editParcelDestination from "../../actions/parcels/editParcel";
import Spinner from "react-spinkit";

ReactModal.setAppElement("#app");

class EditDestination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcel: [],
      showEditModal: false,
      destination: "",
      formError: "",
      parcelStatus: false
    };
    this.editParcel = this.editParcel.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  editParcel(e) {
    e.preventDefault();
    if (
      this.state.formError.length ||
      this.props.destination === this.state.destination
    ) {
      return null;
    }
    this.props.editDestination(this.props.parcelId, this.state.destination);
  }

  handleChange(e) {
    if (!e.target.value) {
      this.setState({ formError: "Destination cannot be empty " });
    }
    this.setState({ formError: "" });
    this.setState({ destination: e.target.value });
  }
  handleCloseModal() {
    this.setState({ showEditModal: false });
  }
  componentDidMount() {
    this.setState({ destination: this.props.destination });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.parcelStatus !== prevState.parcelStatus) {
      nextProps.history.push("/dashboard");
    }
    return null;
  }
  render() {
    const { show, closeEdit } = this.props;
    return (
      <ReactModal
        isOpen={show}
        contentLabel="Modal #1 Global Style Override Example"
        onRequestClose={closeEdit}
        overlayClassName="Overlay"
        className="editModal"
      >
        <div style={modalHeaderStyle}>
          <span style={spanStyle}>
            <i className="far fa-times-circle" onClick={closeEdit} />
          </span>
          <h3 style={modalHeadBrandStyle}>Your Order</h3>
        </div>
        <div style={modalBodyContainer}>
          <form onSubmit={this.editParcel} noValidate>
            {this.state.formError && (
              <span style={errorStyle}>{this.state.formError}</span>
            )}
            <div style={itemStyle}>
              <label style={labelStyle}>New Destination:</label>
              <input
                type="text"
                style={inputStyle}
                value={this.state.destination}
                name="destination"
                onChange={this.handleChange}
              />
            </div>

            <button className="button edit-direction">
              change Destination
            </button>
          </form>
        </div>
      </ReactModal>
    );
  }
}

const mapStateToProps = ({ parcels }) => ({
  parcelStatus: parcels.parcelStatus
});
const mapDispatchToProps = dispatch => ({
  editDestination: (id, destination) =>
    dispatch(editParcelDestination(id, destination))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditDestination));

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

const itemStyle = {
  display: "flex"
};

const modalBodyContainer = {
  padding: "10px",
  maxWidth: "100%"
};
const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 10,
  flex: 4,
  fontSize: "14px",
  outline: "none",
  borderColor: "rgba(0, 0, 0, 0.3)",
  color: "#806B75"
};
const labelStyle = {
  flex: 3,
  color: "#806B75",
  fontWeight: "bold"
};
const buttonStyle = {
  position: "relative",
  margin: "8px 0",
  padding: "8px 20px",
  backgroundColor: "#fd9b01"
};
const errorStyle = {
  fontSize: "12px",
  color: "red"
};
