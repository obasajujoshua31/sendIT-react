import validateCreateForm, { isValid } from "../createValidator";

const mockE1 = {
  target: {
    name: "firstName",
    value: ""
  }
};

const firstNameMock = {
  target: {
    name: "firstName",
    value: "joshua"
  }
};

const mockE2 = {
  target: {
    name: "lastName",
    value: "josh"
  }
};
const mock3 = {
  target: {
    name: "email",
    value: "test@email.com"
  }
};

const mock4 = {
  target: {
    name: "password",
    value: "jos"
  }
};
const emailFake = {
  target: {
    name: "email",
    email: "kenekee"
  }
};
const state = {
  formErrors: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  },
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  isDeactivated: false
};

const state2 = {
  formErrors: {
    password: "",
    confirmPassword: ""
  },
  password: "olumonkeyAdegorilla"
};

const mock5 = {
  target: {
    name: "confirmPassword",
    value: "olumonkeyADegigliri"
  }
};

describe("Create Validation Form test", () => {
  it("should return form errors for a form that is not valid", () => {
    const formErrors = validateCreateForm(mockE1, state);

    expect(formErrors.firstName).toEqual(
      "First name cannot be less than 2 characters"
    );
  });

  it("should return no errors for a form that is correctly filled", () => {
    const formErrors = validateCreateForm(firstNameMock, state);

    expect(formErrors.firstName).toEqual("");
  });

  it("should return no errors for a form that is correctly filled", () => {
    const formErrors = validateCreateForm(mockE2, state);

    expect(formErrors.lastName).toEqual("");
  });

  it("should return errors for a form that is not correctly filled", () => {
    const invalidLastNameMock = Object.assign(mockE2, {
      target: { name: "lastName", value: "" }
    });
    const formErrors = validateCreateForm(invalidLastNameMock, state);

    expect(formErrors.lastName).toEqual(
      "Last name cannot be less than 2 characters"
    );
  });

  it("should return no errors for a form that is correctly filled", () => {
    const formErrors = validateCreateForm(mock3, state);

    expect(formErrors.email).toEqual("");
  });

  it("should return no errors for a form that is correctly filled", () => {
    const formErrors = validateCreateForm(emailFake, state);

    expect(formErrors.email).toEqual("Invalid Email");
  });

  it("should return form errors for a form that is not valid", () => {
    const formErrors = validateCreateForm(mock4, state);

    expect(formErrors.password).toEqual("Weak Password");
  });

  it("should return no errors for a form that is valid", () => {
    const validPasswordMock = Object.assign(mock4, {
      target: {
        name: "password",
        value: "olumonkey"
      }
    });
    const formErrors = validateCreateForm(validPasswordMock, state);
    expect(formErrors.password).toEqual("");
  });
  it("should return form errors for a form that is not valid", () => {
    const formErrors = validateCreateForm(mock5, state2);
    expect(formErrors.confirmPassword).toEqual("Password does not match");
  });

  it("should return no errors for a form that is valid", () => {
    const validConfirmPasswordMock = Object.assign(mock5, {
      target: { name: "confirmPassword", value: "olumonkeyAdegorilla" }
    });

    const formErrors = validateCreateForm(validConfirmPasswordMock, state2);
    expect(formErrors.confirmPassword).toEqual("");
  });

  it("should return no errors for a form that is valid", () => {
    const validResult = isValid(state);
    expect(validResult).toEqual(false);
  });
});
