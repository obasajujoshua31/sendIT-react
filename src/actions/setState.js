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
      dispatch({
        type: signInSuccess,
        errorMessage: "",
        user,
        role
      });
      break;
    case signInFailure:
      dispatch({
        type: signInFailure,
        errorMessage: error
      });

    case isLoggedOut:
      dispatch({
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
      dispatch({
        type: signUpFailure,
        errorMsg: error
      });
  }
};
