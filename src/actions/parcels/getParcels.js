import axios from "axios";

import { viewOrders, signInFailure, signInSuccess } from "../../types/types";
import { setSignInState } from "../setState";
import { baseUrl } from "../../helpers/constants";

const loadUserParcels = history => dispatch => {
  const token = window.localStorage.getItem("token");
  return axios
    .get(`${baseUrl}/users/parcels`, {
      headers: {
        Authorization: token
      }
    })
    .then(({ data }) => {
      dispatch(setSignInState(signInSuccess, null, false, null));
      dispatch({
        type: viewOrders,
        payload: data.data
      });
    })
    .catch(error => {
      switch (error.response.status) {
        case 404:
          dispatch(setSignInState(signInSuccess, null, false, null));
          return dispatch({
            type: viewOrders,
            payload: []
          });
        case 401:
          return dispatch(
            setSignInState(
              signInFailure,
              null,
              false,
              error.response.data.error
            )
          );
      }
    });
};

export default loadUserParcels;
