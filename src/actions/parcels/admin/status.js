import axios from "axios";

import {
  signInFailure,
  signInSuccess,
  updateParcelStatus
} from "../../../types/types";
import { setSignInState } from "../../setState";

import { baseUrl } from "../../../helpers/constants";

const changeStatus = (parcelId, status) => dispatch => {
  const token = window.localStorage.getItem("token");
  return axios
    .put(
      `${baseUrl}/parcels/${parcelId}/status`,
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
