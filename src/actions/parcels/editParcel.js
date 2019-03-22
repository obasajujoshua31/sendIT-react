import axios from "axios";

import { updateParcel, signInFailure, signInSuccess } from "../../types/types";
import { setSignInState } from "../setState";

const baseUrl = "http://localhost:5500/api/v1/parcels";

const editParcelDestination = (parcelId, destination) => dispatch => {
  const token = window.localStorage.getItem("token");
  return axios
    .put(
      `${baseUrl}/${parcelId}/destination`,
      {
        destination
      },
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then(({ data }) => {
      dispatch(setSignInState(signInSuccess));
      dispatch({
        type: updateParcel,
        payload: data
      });
    })
    .catch(error => {
      dispatch(setSignInState(signInFailure, error.response.data.error));
    });
};

export default editParcelDestination;
