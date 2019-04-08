import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Spinner from "react-md-spinner";
import createParcel from "../../actions/parcels/createOrders";
import { signInFailure, signUpFailure } from "../../types/types";
import validateParcelCreateForm, {
  isValid
} from "../../validations/parcelValidator";
import loadUserParcels from "../../actions/parcels/getParcels";

export class CreateOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parcelName: "",
      destination: "",
      pickUpLocation: "",
      weight: "",
      weightMetric: "Kg",
      isDeactivated: false,
      formErrors: {
        parcelName: "",
        destination: "",
        pickUpLocation: "",
        weight: ""
      },
      isLoading: true,
      parcels: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    this.props.loadParcels();
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (
        this.props.authStatus === signInFailure ||
        this.props.authStatus === signUpFailure
      ) {
        this.props.history.push("/login");
      }
      if (this.props.parcels) {
        this.setState({ isLoading: false });
      }
      if (this.props.createdStatus) {
        this.props.history.push("view-orders");
      }
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ formErrors: validateParcelCreateForm(e, this.state) });
    if (!isValid(this.state)) {
      this.setState({ isDeactivated: true });
    } else {
      this.setState({ isDeactivated: false });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    if (!isValid(this.state)) {
      return this.setState({ isLoading: false });
    } else {
      this.props.createParcel(this.state);
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

    const {
      parcelName,
      weight,
      pickUpLocation,
      destination,
      formErrors,
      isDeactivated
    } = this.state;
    return (
      <React.Fragment>
        <div className="account-wrapper">
          <div className="form-wrapper create-wrapper">
            <form onSubmit={this.handleSubmit} noValidate>
              <h2>Create Parcel</h2>

              <div className="form-oneline">
                <div className="form-group">
                  <label htmlFor="parcelName">Parcel Name</label>
                  <input
                    className={formErrors.parcelName.length > 0 ? "error" : ""}
                    type="text"
                    placeholder="Parcel Name"
                    name="parcelName"
                    value={parcelName}
                    onChange={this.handleChange}
                    required
                  />
                  {formErrors.parcelName.length > 0 && (
                    <span className="errorMsg">{formErrors.parcelName}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="parcel Weight">Weight</label>
                  <input
                    className={formErrors.weight.length > 0 ? "error" : ""}
                    type="number"
                    placeholder="Weight"
                    name="weight"
                    value={weight}
                    onChange={this.handleChange}
                    required
                  />
                  {formErrors.weight.length > 0 && (
                    <span className="errorMsg">{formErrors.weight} </span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="weightMetric">Weight Metric</label>
                <select
                  value={this.state.weightMetric}
                  onChange={this.handleChange}
                  name="weightMetric"
                >
                  <option value="Kg">Kg</option>
                  <option value="g">g</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="pickUpLocation">Pick Up Location</label>
                <input
                  className={
                    formErrors.pickUpLocation.length > 0 ? "error" : ""
                  }
                  type="text"
                  placeholder="Your PickUp Location"
                  name="pickUpLocation"
                  value={pickUpLocation}
                  onChange={this.handleChange}
                  required
                />
                {formErrors.pickUpLocation.length > 0 && (
                  <span className="errorMsg">{formErrors.pickUpLocation}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="destination">Your Destination</label>
                <input
                  className={formErrors.destination.length > 0 ? "error" : ""}
                  type="text"
                  placeholder="Your Destination"
                  name="destination"
                  value={destination}
                  onChange={this.handleChange}
                  required
                />
                {formErrors.destination.length > 0 && (
                  <span className="errorMsg">{formErrors.destination}</span>
                )}
              </div>
              <button hidden={isDeactivated} type="submit">
                Send Parcel
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export const mapDispatchToProps = dispatch => ({
  loadParcels: () => dispatch(loadUserParcels()),
  createParcel: parcel => dispatch(createParcel(parcel))
});

export const mapStateToProps = ({ users, parcels }) => ({
  authStatus: users.singInStatus,
  createdStatus: parcels.parcelStatus,
  parcels: parcels.parcels
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateOrder));
