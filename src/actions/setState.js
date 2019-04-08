import {
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
  isLoggedOut
} from "../types/types";

export const setSignInState = (signInState, user, role, error) => dispatch => {
  switch (signInState) {
    case signInSuccess:
      return dispatch({
        type: signInSuccess,
        errorMessage: "",
        user,
        role
      });
    case signInFailure:
      return dispatch({
        type: signInFailure,
        errorMessage: error
      });

    case isLoggedOut:
      return dispatch({
        type: isLoggedOut
      });
  }
};

export const setSignUpState = (signUpState, user, error) => dispatch => {
  switch (signUpState) {
    case signUpSuccess:
      dispatch({
        type: signUpSuccess,
        errorMessage: "",
        user
      });
      break;

    case signUpFailure:
      return dispatch({
        type: signUpFailure,
        errorMsg: error
      });
  }
};
