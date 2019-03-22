import isValidLoginForm from "../loginValidator";

const field = {
  email: "test@email.com",
  password: "12345678"
};

describe("Login Form Validator Test", () => {
  it("should return true for a valid form", () => {
    const validResult = isValidLoginForm(field);
    expect(validResult).toEqual(true);
  });
  it("should return false for an invalid login form", () => {
    const invalidForm = Object.assign(field, {
      email: "josh",
      password: "123"
    });
    const validationResult = isValidLoginForm(invalidForm);
    expect(validationResult).toEqual(false);
  });
});
