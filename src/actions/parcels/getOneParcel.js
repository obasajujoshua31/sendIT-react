import axios from "axios";

import { viewOrder, signInFailure, signInSuccess } from "../../types/types";
import { setSignInState } from "../setState";

const baseUrl = "http://localhost:5500/api/v1/parcels";

const getOneParcel = (parcelId, role) => dispatch => {
  const token = window.localStorage.getItem("token");
  return axios
    .get(`${baseUrl}/${parcelId}`, {
      headers: {
        Authorization: token
      }
    })
    .then(({ data }) => {
      dispatch(setSignInState(signInSuccess, null, role, null));
      dispatch({
        type: viewOrder,
        payload: data
      });
    })
    .catch(error => {
      dispatch(
        setSignInState(signInFailure, null, null, error.response.data.error)
      );
    });
};

export default getOneParcel;
