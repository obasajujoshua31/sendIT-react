import validateParcelCreateForm, { isValid } from "../parcelValidator";

const parcelNameMock = {
  target: {
    name: "parcelName",
    value: ""
  }
};

const state = {
  parcelName: "",
  destination: "",
  pickUpLocation: "",
  weight: "",
  weightMetric: "Kg",
  isDeactivated: false,
  formErrors: {
    parcelName: "",
    destination: "",
    pickUpLocation: "",
    weight: ""
  }
};

const formErrorsMock = {
  parcelName: "Error",
  destination: "Error"
};

describe("Create Parcel Validation Form test", () => {
  it("should return form errors for a parcel form that is not valid", () => {
    const formErrors = validateParcelCreateForm(parcelNameMock, state);

    expect(formErrors.parcelName).toEqual(
      "Parcel name cannot be less than 2 characters"
    );
  });

  it("should return no errors for a parcel form that is valid", () => {
    const validParcelFormMock = Object.assign(parcelNameMock, {
      target: { name: "parcelName", value: "iphone" }
    });
    const formErrors = validateParcelCreateForm(validParcelFormMock, state);

    expect(formErrors.parcelName).toEqual("");
  });

  it("should return form errors for a parcel form that is not valid", () => {
    const invalidParcelFormMock = Object.assign(parcelNameMock, {
      target: { name: "pickUpLocation", value: "" }
    });

    const formErrors = validateParcelCreateForm(invalidParcelFormMock, state);

    expect(formErrors.pickUpLocation).toEqual(
      "Pick Up Location cannot be less than 2 characters"
    );
  });

  it("should return no errors for a parcel form that is valid", () => {
    const validParcelFormMock = Object.assign(parcelNameMock, {
      target: { name: "pickUpLocation", value: "Ikeja Lagos" }
    });

    const formErrors = validateParcelCreateForm(validParcelFormMock, state);

    expect(formErrors.pickUpLocation).toEqual("");
  });

  it("should return form errors for a parcel form that is not valid", () => {
    const invalidParcelFormMock = Object.assign(parcelNameMock, {
      target: { name: "destination", value: "" }
    });

    const formErrors = validateParcelCreateForm(invalidParcelFormMock, state);

    expect(formErrors.destination).toEqual("Destination cannot be blank");
  });

  it("should return no errors for a parcel form that is valid", () => {
    const validParcelFormMock = Object.assign(parcelNameMock, {
      target: { name: "destination", value: "Ikeja Lagos" }
    });

    const formErrors = validateParcelCreateForm(validParcelFormMock, state);

    expect(formErrors.destination).toEqual("");
  });

  it("should return form errors for a parcel form that is not valid", () => {
    const invalidParcelFormMock = Object.assign(parcelNameMock, {
      target: { name: "weight", value: "" }
    });

    const formErrors = validateParcelCreateForm(invalidParcelFormMock, state);

    expect(formErrors.weight).toEqual("Weight cannot be blank");
  });

  it("should return no errors for a parcel form that is valid", () => {
    const validParcelFormMock = Object.assign(parcelNameMock, {
      target: { name: "weight", value: "450" }
    });
    const formErrors = validateParcelCreateForm(validParcelFormMock, state);
    expect(formErrors.destination).toEqual("");
  });

  it("should return no errors for a form that is valid", () => {
    const validResult = isValid(state);
    expect(validResult).toEqual(false);
  });

  it("should return errors for a form that is valid", () => {
    const invalidState = Object.assign(state, { formErrors: formErrorsMock });
    const validResult = isValid(invalidState);
    expect(validResult).toEqual(false);
  });
});
