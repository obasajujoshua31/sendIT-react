import axios from "axios";

import { createOrderSuccess, createOrderFailure } from "../../types/types";

const baseUrl = "http://localhost:5500/api/v1/parcels";

const createParcels = ({
  parcelName,
  pickUpLocation,
  destination,
  weight,
  weightMetric
}) => dispatch => {
  const token = window.localStorage.getItem("token");
  return axios
    .post(
      baseUrl,
      {
        parcelName,
        from: pickUpLocation,
        to: destination,
        weight,
        weightMetric
      },
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then(() => {
      dispatch({
        type: createOrderSuccess
      });
    })
    .catch(error => {
      dispatch({
        type: createOrderFailure,
        payload: error.response.data.error
      });
    });
};

export default createParcels;
