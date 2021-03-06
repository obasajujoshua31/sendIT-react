import { isLoggedOut } from "../../types/types";
import { setSignInState } from "../setState";

const logOutUser = () => dispatch => {
  window.localStorage.removeItem("token");
  return dispatch(setSignInState(isLoggedOut));
};

export default logOutUser;
