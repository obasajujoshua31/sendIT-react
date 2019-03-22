import React from "react";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import { CreateAccount, mapDispatchToProps, mapStateToProps } from "../Create";
import { signUpSuccess } from "../../../types/types";

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

const wrapper = shallow(<CreateAccount {...props} />);

describe(" <CreateAccount> ", () => {
  it("should render CreateAccount Component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should contain 8 <div> tags", () => {
    expect(wrapper.find("div").length).toEqual(8);
  });
  it("should contain 1 <form> tag", () => {
    expect(wrapper.find("form").length).toEqual(1);
  });
  it("should contain 1 <h2> tag", () => {
    expect(wrapper.find("h2").length).toEqual(1);
  });
  it("should contain 5 <label> tags", () => {
    expect(wrapper.find("label").length).toEqual(5);
  });
  it("should contain 5 <input> tags", () => {
    expect(wrapper.find("input").length).toEqual(5);
  });
  it("should contain 1 <button> tag", () => {
    expect(wrapper.find("button").length).toEqual(1);
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

  // it("should set isDeactivated to false", () => {
  //   wrapper
  //     .find("input")
  //     .at(0)
  //     .simulate("change", {
  //       target: {
  //         value: "",
  //         name: "firstName"
  //       }
  //     });
  //   expect(wrapper.instance().state.firstName).toEqual("");
  //   // expect(wrapper.instance().state.isDeactivated).toEqual(true)
  // });

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
    const addedProps = { ...props, signUpStatus: signUpSuccess };
    const alteredWrapper = shallow(<CreateAccount {...addedProps} />);
    expect(alteredWrapper.instance().props.history.push).toHaveBeenCalled();
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
});
