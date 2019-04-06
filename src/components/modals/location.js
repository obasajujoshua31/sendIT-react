import React, { Component } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Spinner from "react-md-spinner";
import editParcelLocation from "../../actions/parcels/admin/location";

export class ChangeLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcel: [],
      showLocationModal: false,
      presentLocation: "",
      formError: "",
      parcelStatus: false
    };
    this.changePresentLocation = this.changePresentLocation.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (process.env.NODE_ENV !== "test") {
      ReactModal.setAppElement("#app");
    }
  }

  changePresentLocation(e) {
    e.preventDefault();
    if (
      this.state.formError ||
      this.props.presentLocation === this.state.presentLocation
    ) {
      return null;
    }
    this.props.editLocation(this.props.parcelId, this.state.presentLocation);
  }

  handleChange(e) {
    if (!e.target.value.trim()) {
      return this.setState({ formError: "Present Location cannot be empty" });
    }
    this.setState({ formError: "" });
    this.setState({ presentLocation: e.target.value });
  }

  handleCloseModal() {
    this.setState({ showLocationModal: false });
  }

  componentDidMount = () => {
    this.setState({ presentLocation: this.props.presentLocation });
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.parcelStatus) {
        this.props.history.push("/admin-dashboard");
      }
    }
  }

  render() {
    const { show, closeChangeLocation } = this.props;
    return (
      <ReactModal
        isOpen={show}
        contentLabel="Modal #1 Global Style Override Example"
        onRequestClose={closeChangeLocation}
        overlayClassName="Overlay"
        className="editModal"
      >
        <div style={modalHeaderStyle}>
          <span style={spanStyle}>
            <i className="far fa-times-circle" onClick={closeChangeLocation} />
          </span>
          <h3 style={modalHeadBrandStyle}>Change Parcel Location</h3>
        </div>
        <div style={modalBodyContainer}>
          <form onSubmit={this.changePresentLocation} noValidate>
            {this.state.formError && (
              <span style={errorStyle}>{this.state.formError}</span>
            )}
            <div style={itemStyle}>
              <label style={labelStyle}>Present Location:</label>
              <input
                type="text"
                style={inputStyle}
                value={this.state.presentLocation || ""}
                name="presentLocation"
                onChange={this.handleChange}
              />
            </div>

            <button className="button edit-direction">change Location</button>
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
  editLocation: (id, presentLocation) =>
    dispatch(editParcelLocation(id, presentLocation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChangeLocation));

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
