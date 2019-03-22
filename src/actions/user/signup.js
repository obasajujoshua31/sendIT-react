import axios from "axios";

import { signUpFailure, signUpSuccess } from "../../types/types";
import { setSignUpState } from "../setState";

const baseUrl = "http://localhost:5500/api/v1/auth/signup";

const registerUser = user => dispatch => {
  const { email, password, firstName, lastName } = user;

  return axios
    .post(baseUrl, {
      email,
      password,
      firstName,
      lastName
    })
    .then(({ data }) => {
      window.localStorage.setItem("token", `Bearer ${data.token}`);
      dispatch(setSignUpState(signUpSuccess));
    })
    .catch(error => {
      dispatch(setSignUpState(signUpFailure, error.response.data.error));
    });
};

export default registerUser;
