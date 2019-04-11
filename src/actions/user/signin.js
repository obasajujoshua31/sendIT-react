import axios from "axios";

import { signInSuccess, signInFailure } from "../../types/types";
import { setSignInState, setSignInError } from "../setState";

import { baseUrl } from "../../helpers/constants";

const signUserIn = user => dispatch => {
  const { email, password } = user;
  return axios
    .post(`${baseUrl}/auth/login`, {
      email,
      password
    })
    .then(({ data }) => {
      window.localStorage.setItem("token", `Bearer ${data.token}`);
      dispatch(
        setSignInState(signInSuccess, data.user, data.user.isAdmin, null)
      );
      return Promise.resolve(data.user.isAdmin);
    })
    .catch(error => {
      dispatch(
        setSignInState(signInFailure, null, null, error.response.data.error)
      );

      return Promise.reject(error.response.data.error);
    });
};

export default signUserIn;
