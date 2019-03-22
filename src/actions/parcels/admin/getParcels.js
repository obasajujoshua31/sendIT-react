import axios from "axios";

import {
  viewOrders,
  signInFailure,
  signInSuccess,
  isAdmin
} from "../../../types/types";
import { setSignInState } from "../../setState";

const baseUrl = "http://localhost:5500/api/v1/parcels";

const loadUserParcels = () => dispatch => {
  const token = window.localStorage.getItem("token");
  return axios
    .get(baseUrl, {
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
