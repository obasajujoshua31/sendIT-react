import axios from "axios";

import { createOrderSuccess, createOrderFailure } from "../../types/types";

import { baseUrl } from "../../helpers/constants";

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
      `${baseUrl}/parcels`,
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
