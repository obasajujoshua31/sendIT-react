import axios from "axios";

import {
  viewOrders,
  signInFailure,
  signInSuccess,
  isAdmin
} from "../../../types/types";
import { setSignInState } from "../../setState";

import { baseUrl } from "../../../helpers/constants";

const loadUserParcels = () => dispatch => {
  const token = window.localStorage.getItem("token");
  return axios
    .get(`${baseUrl}/parcels`, {
      headers: {
        Authorization: token
      }
    })
    .then(({ data }) => {
      dispatch(setSignInState(signInSuccess, null, true, null));
      dispatch({
        type: viewOrders,
        payload: data
      });
    })
    .catch(error => {
      dispatch(setSignInState(signInFailure, null, error.response.data.error));
    });
};

export default loadUserParcels;
