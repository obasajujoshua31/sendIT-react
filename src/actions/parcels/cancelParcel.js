import axios from "axios";

import { cancelOrder, signInFailure, signInSuccess } from "../../types/types";
import { setSignInState } from "../setState";
import { baseUrl } from "../../helpers/constants";

const cancelParcel = parcelId => dispatch => {
  return axios({
    method: "PUT",
    url: `${baseUrl}/parcels/${parcelId}/cancel`,
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
