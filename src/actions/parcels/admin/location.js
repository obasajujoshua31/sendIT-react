import axios from "axios";

import {
  updateLocation,
  signInFailure,
  signInSuccess
} from "../../../types/types";
import { setSignInState } from "../../setState";

import { baseUrl } from "../../../helpers/constants";

const editLocation = (parcelId, presentLocation) => dispatch => {
  const token = window.localStorage.getItem("token");
  return axios
    .put(
      `${baseUrl}/parcels/${parcelId}/presentLocation`,
      {
        presentLocation
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
        type: updateLocation
      });
    })
    .catch(error => {
      dispatch(
        setSignInState(signInFailure, null, null, error.response.data.error)
      );
    });
};

export default editLocation;
