import axios from "axios";

import {
  signInFailure,
  signInSuccess,
  updateParcelStatus
} from "../../../types/types";
import { setSignInState } from "../../setState";

const baseUrl = "http://localhost:5500/api/v1/parcels";

const changeStatus = (parcelId, status) => dispatch => {
  const token = window.localStorage.getItem("token");
  return axios
    .put(
      `${baseUrl}/${parcelId}/status`,
      {
        status
      },
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then(() => {
      dispatch(setSignInState(signInSuccess, null, true, null));
      dispatch({
        type: updateParcelStatus
      });
    })
    .catch(error => {
      dispatch(
        setSignInState(signInFailure, null, null, error.response.data.error)
      );
    });
};

export default changeStatus;
