import axios from "axios";

import { viewOrder, signInFailure, signInSuccess } from "../../types/types";
import { setSignInState } from "../setState";
import { baseUrl } from "../../helpers/constants";

const getOneParcel = (parcelId, role) => dispatch => {
  const token = window.localStorage.getItem("token");
  return axios
    .get(`${baseUrl}/parcels/${parcelId}`, {
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
