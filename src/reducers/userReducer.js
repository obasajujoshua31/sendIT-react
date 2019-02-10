import {
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
  isLoggedOut,
  isAdmin
} from "../types/types";
const initialState = {
  singInStatus: "",
  errorMessage: "",
  errorMsg: "",
  signUpStatus: "",
  role: false,
  user: {}
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case signInSuccess:
      return {
        ...state,
        user: action.user,
        errorMessage: "",
        singInStatus: signInSuccess,
        signUpStatus: "",
        role: action.role
      };
    case signInFailure:
      const { errorMessage } = action;
      return {
        ...state,
        singInStatus: signInFailure,
        errorMessage,
        errorMsg: "",
        role: false
      };

    case signUpSuccess:
      return {
        ...state,
        errorMsg: "",
        signUpStatus: signUpSuccess,
        errorMessage: "",
        user: action.user,
        role: false
      };
    case signUpFailure:
      const { errorMsg } = action;
      return {
        ...state,
        errorMsg,
        signUpStatus: signUpFailure,
        errorMessage: "",
        user: {},
        role: false
      };

    case isLoggedOut:
      return {
        ...state,
        errorMessage: "",
        errorMsg: "",
        singInStatus: isLoggedOut,
        user: {},
        role: false
      };
    default:
      return state;
  }
};

export default userReducer;
