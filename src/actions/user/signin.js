import axios from "axios";

import { signInSuccess, signInFailure } from "../../types/types";
import { setSignInState, setSignInError } from "../setState";

const baseUrl = "http://localhost:5500/api/v1/auth/login";

const signUserIn = user => dispatch => {
  const { email, password } = user;
  return axios
    .post(baseUrl, {
      email,
      password
    })
    .then(({ data }) => {
      window.localStorage.setItem("token", `Bearer ${data.token}`);
      dispatch(
        setSignInState(signInSuccess, data.user, data.user.isAdmin, null)
      );
    })
    .catch(error => {
      dispatch(
        setSignInState(signInFailure, null, null, error.response.data.error)
      );
    });
};

export default signUserIn;
