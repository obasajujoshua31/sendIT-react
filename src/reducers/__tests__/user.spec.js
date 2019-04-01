import {
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
  isLoggedOut
} from "../../types/types";
import userReducer from "../userReducer";

const initialState = {
  singInStatus: "",
  errorMessage: "",
  errorMsg: "",
  signUpStatus: "",
  role: false,
  user: {}
};

describe("Test for User Reducer", () => {
  it("should return initial state for an unknown action", () => {
    const reducerResult = userReducer(undefined, { type: "unexpected" });
    expect(reducerResult).toEqual(initialState);
  });

  it("should return signInSuccess for an action type of signInSuccess", () => {
    const reducerResult = userReducer(initialState, {
      type: signInSuccess,
      user: {
        id: 2,
        email: "test@email.com"
      },
      role: false
    });

    expect(reducerResult.singInStatus).toEqual(signInSuccess);
    expect(reducerResult.user).toEqual({ id: 2, email: "test@email.com" });
  });

  it("should return signInFailure for an action type of signInFailure", () => {
    const reducerResult = userReducer(initialState, {
      type: signInFailure,
      errorMessage: "Sign In Failed"
    });

    expect(reducerResult.singInStatus).toEqual(signInFailure);
    expect(reducerResult.errorMessage).toEqual("Sign In Failed");
  });

  it("should log out a user", () => {
    const reducerResult = userReducer(initialState, {
      type: isLoggedOut,
      role: false
    });
    expect(reducerResult.singInStatus).toEqual(isLoggedOut);
  });
  it("should return signUPSuccess for an action type of signInSuccess", () => {
    const reducerResult = userReducer(initialState, {
      type: signUpSuccess,
      user: {
        id: 2,
        email: "test@email.com"
      },
      role: false
    });

    expect(reducerResult.signUpStatus).toEqual(signUpSuccess);
    expect(reducerResult.user).toEqual({ id: 2, email: "test@email.com" });
  });

  it("should return signUpFailure for an action type of signInFailure", () => {
    const reducerResult = userReducer(initialState, {
      type: signUpFailure,
      errorMsg: "SignUp Failed"
    });

    expect(reducerResult.signUpStatus).toEqual(signUpFailure);
    expect(reducerResult.errorMsg).toEqual("SignUp Failed");
  });
});
