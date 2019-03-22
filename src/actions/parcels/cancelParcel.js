import axios from "axios";

import { cancelOrder, signInFailure, signInSuccess } from "../../types/types";
import { setSignInState } from "../setState";

const baseUrl = "http://localhost:5500/api/v1/parcels";

const cancelParcel = parcelId => dispatch => {
  return axios({
    method: "PUT",
    url: `${baseUrl}/${parcelId}/cancel`,
    headers: {
      Authorization: window.localStorage.getItem("token"),
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    .then(({ data }) => {
      dispatch(setSignInState(signInSuccess));
      dispatch({
        type: cancelOrder,
        payload: data
      });
    })
    .catch(error => {
      dispatch(setSignInState(signInFailure, error.response.data.error));
    });
};

export default cancelParcel;
