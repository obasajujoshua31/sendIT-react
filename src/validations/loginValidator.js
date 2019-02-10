import emailRegex from "../helpers/constants";

const isValidLoginForm = ({ email, password }) => {
  let valid = true;

  emailRegex.test(email) ? null : (valid = false);

  password.length < 6 && (valid = false);

  return valid;
};

export default isValidLoginForm;
