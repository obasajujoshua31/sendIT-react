import React, { Component } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import updateStatus from "../../actions/parcels/admin/status";

export class ChangeStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcel: [],
      showCancelModal: false,
      status: ""
    };
    this.changeStatus = this.changeStatus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  changeStatus(e) {
    e.preventDefault();
    this.props.changeParcelStatus(this.props.parcelId, this.state.status);
  }
  componentWillMount() {
    if (process.env.NODE_ENV !== "test") {
      ReactModal.setAppElement("#app");
    }
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentDidMount = () => {
    this.setState({ status: this.props.status });
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.parcelStatus) {
        this.props.history.push("/admin-dashboard");
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
          <h3 style={modalHeadBrandStyle}>Change Parcel Status</h3>
        </div>
        <div style={modalBodyContainer}>
          <form onSubmit={this.changeStatus} noValidate>
            <select
              style={selectStyle}
              onChange={this.handleChange}
              name="status"
              value={this.state.status}
            >
              <option value="CANCELLED" disabled>
                Cancelled
              </option>
              <option value="PLACED" disabled>
                Placed
              </option>
              <option value="TRANSITING">Transiting</option>
              <option value="DELIVERED">Delivered</option>
            </select>
            <br />
            <button style={buttonStyle}>Confirm Change Status</button>
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
  changeParcelStatus: (id, status) => dispatch(updateStatus(id, status))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChangeStatus));

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
  marginTop: "10px",
  cursor: "pointer",
  padding: "10px 20px",
  backgroundColor: "#fd9b01",
  color: "white",
  border: "none",
  outline: "none"
};
const selectStyle = {
  height: "30px",
  width: "200px"
};
