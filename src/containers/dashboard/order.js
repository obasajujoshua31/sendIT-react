import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Order extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      parcel: {
        parcel_id,
        parcel_name,
        destination,
        pick_up_location,
        sent_on,
        status
      },
      onHandleViewOrder
    } = this.props;
    return (
      <React.Fragment>
        <tr onClick={() => onHandleViewOrder(parcel_id)}>
          <th scope="row">{`#${parcel_id}`}</th>
          <td>{parcel_name}</td>
          <td>{pick_up_location}</td>
          <td>{destination}</td>
          <td>{sent_on}</td>
          <td>{status}</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default withRouter(Order);
