import emailRegex from "../helpers/constants";

const validateCreateForm = (e, state) => {
  const { name, value } = e.target;
  const { formErrors, password } = state;
  switch (name) {
    case "firstName":
      formErrors.firstName =
        value.length > 2 ? "" : "First name cannot be less than 2 characters";
      break;
    case "lastName":
      formErrors.lastName =
        value.length > 2 ? "" : "Last name cannot be less than 2 characters";
      break;
    case "email":
      formErrors.email = emailRegex.test(value) ? "" : "Invalid Email";
      break;

    case "password":
      formErrors.password = value.length > 5 ? "" : "Weak Password";
      break;

    case "confirmPassword":
      formErrors.confirmPassword =
        value === password ? "" : "Password does not match";
      break;
  }
  return formErrors;
};

export default validateCreateForm;

export const isValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(
    value => value.length > 0 && (valid = false)
  );

  Object.values(rest).forEach(value => value.length === 0 && (valid = false));
  return valid;
};