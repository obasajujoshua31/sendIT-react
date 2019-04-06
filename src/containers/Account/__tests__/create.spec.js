import React from "react";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import { CreateAccount, mapDispatchToProps, mapStateToProps } from "../Create";
import { signUpSuccess, signInFailure } from "../../../types/types";

const props = {
  signUp: jest.fn(),
  history: {
    push: jest.fn()
  },
  errorMsg: "",
  signUpStatus: ""
};
const mockUser = {
  firstName: "Monkey",
  lastName: "Gorilla",
  email: "monkey@gorilla.com",
  password: "animal",
  confirmPassword: "animal"
};

const mockStore = {
  users: {
    signUpStatus: "Success",
    errorMsg: null
  }
};

const mockSubmit = {
  preventDefault: jest.fn()
};

const validState = {
  formErrors: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  }
};

const wrapper = shallow(<CreateAccount {...props} />);

describe(" <CreateAccount> ", () => {
  it("should render CreateAccount Component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should set the firstName field to test", () => {
    wrapper
      .find("input")
      .at(0)
      .simulate("change", {
        target: {
          value: "test",
          name: "firstName"
        }
      });
    expect(wrapper.instance().state.firstName).toEqual("test");
  });

  it("should set isDeactivated to false", () => {
    wrapper.setState({
      formErrors: validState.formErrors,
      firstName: "dkkdkd",
      lastName: "lldldld",
      email: "me@example.com",
      password: "000000",
      confirmPassword: "000000"
    });

    wrapper
      .find("input")
      .at(0)
      .simulate("change", {
        target: {
          value: "dkkdkkd",
          name: "firstName"
        }
      });
    // console.log(wrapper.instance().state)
    expect(wrapper.instance().state.isDeactivated).toEqual(false);
  });

  it("should call dispatch action", () => {
    const dispatchSpy = sinon.spy();
    const dispatchResult = mapDispatchToProps(dispatchSpy);
    dispatchResult.signUp(mockUser);
    expect(dispatchSpy.callCount).toEqual(1);
  });

  it("should map state to Props", () => {
    const mapStateResult = mapStateToProps(mockStore);
    expect(mapStateResult.signUpStatus).toEqual("Success");
  });

  it("should call history.push", () => {
    wrapper.setProps({
      signUpStatus: signUpSuccess
    });

    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });

  it("should render when props changes but it is not sign up success", () => {
    wrapper.setProps({
      signUpStatus: signInFailure
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should call submit", () => {
    let prevented = false;
    const formElement = wrapper.find("form");
    formElement.simulate("submit", {
      preventDefault: () => {
        prevented = true;
      }
    });
    expect(prevented).toEqual(true);
  });

  it("should re render when the form is invalid when the submit button is clicked", () => {
    const submitSpy = jest.spyOn(wrapper.instance(), "handleSubmit");
    wrapper.setState({
      firstName: "",
      lastName: ""
    });
    submitSpy(mockSubmit);
    expect(wrapper).toMatchSnapshot();
  });

  it("should re render when there is error in the form", () => {
    wrapper.setState({
      formErrors: {
        password: "kdkdkddkkd",
        confirmPassword: "llld",
        firstName: "kdkdkkd",
        lastName: "kdkdkkd",
        email: "lldldlld"
      }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should re render when there is error in the form", () => {
    wrapper.setProps({
      errorMsg: "dkkdkdkkk"
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("should call props.signup", () => {
    let prevented = false;
    wrapper.setState({
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      email: mockUser.email,
      password: mockUser.password,
      confirmPassword: mockUser.confirmPassword
    });
    const formElement = wrapper.find("form");
    formElement.simulate("submit", {
      preventDefault: () => {
        prevented = true;
      }
    });
    expect(wrapper.instance().props.signUp).toHaveBeenCalled();
  });
  it("should call history.push", () => {
    wrapper.setProps({
      signUpStatus: signUpSuccess
    });
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });
});
