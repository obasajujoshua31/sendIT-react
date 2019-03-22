import axios from "axios";

import {
    signInUser,
    signUpUser,
    signInSuccess,
    signInFailure
} from "../types/types";
import { setSignInState, setSignInError } from "./setSignInState";

const baseUrl = "http://localhost:5500/api/v1/auth/";

 const postRequest = user => dispatch => {
    return axios
        .post(baseUrl, {
            ...user
        })
        .then(({ data }) => {
            window.localStorage.setItem("token", data.token);
            dispatch(setSignInState(signInSuccess));
        })
        .catch(error => {
            dispatch(setSignInState(signInFailure));
            dispatch(setSignInError(error.response.data.error));
        });
};


export default postRequest;