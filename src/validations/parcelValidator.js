const validateCreateParcelForm = (e, state) => {
  const { name, value } = e.target;
  const { formErrors } = state;
  switch (name) {
    case "parcelName":
      formErrors.parcelName =
        value.length > 2 ? "" : "Parcel name cannot be less than 2 characters";
      break;
    case "pickUpLocation":
      formErrors.pickUpLocation =
        value.length > 2
          ? ""
          : "Pick Up Location cannot be less than 2 characters";
      break;

    case "destination":
      formErrors.destination =
        value.length > 2 ? "" : "Destination cannot be blank";
      break;

    case "weight":
      formErrors.weight = value.length > 0 ? "" : "Weight cannot be blank";
      break;
  }
  return formErrors;
};

export default validateCreateParcelForm;

export const isValid = ({
  formErrors,
  parcelName,
  destination,
  pickUpLocation,
  weight,
  weightMetric
}) => {
  let valid = true;
  Object.values(formErrors).forEach(
    value => value.length > 0 && (valid = false)
  );

  [parcelName, destination, pickUpLocation, weight, weightMetric].forEach(
    value => value.length === 0 && (valid = false)
  );
  return valid;
};
