import axios from "axios";

import { signUpFailure, signUpSuccess } from "../../types/types";
import { setSignUpState } from "../setState";

import { baseUrl } from "../../helpers/constants";

const registerUser = user => dispatch => {
  const { email, password, firstName, lastName } = user;

  return axios
    .post(`${baseUrl}/auth/signup`, {
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
