import React from "react";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import { toast } from "react-toastify";
import { Login, mapDispatchToProps, mapStateToProps } from "../Login";
import { signUpSuccess, signInSuccess } from "../../../types/types";

const props = {
  signIn: jest.fn(),
  history: {
    push: jest.fn()
  },
  errorMessage: "",
  singInStatus: ""
};
const mockUser = {
  email: "monkey@gorilla.com",
  password: "animal"
};

// const mockToast = {
//     toast: jest.fn()
// }
const mockStore = {
  users: {
    singInStatus: "Success",
    errorMsg: null
  }
};

const wrapper = shallow(<Login {...props} />);

describe(" <Login> ", () => {
  it("should render Login Component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should contain 4 <div> tags", () => {
    expect(wrapper.find("div").length).toEqual(4);
  });
  it("should contain 1 <form> tag", () => {
    expect(wrapper.find("form").length).toEqual(1);
  });
  it("should contain 1 <h2> tag", () => {
    expect(wrapper.find("h2").length).toEqual(1);
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

  it("should call dispatch action", () => {
    const dispatchSpy = sinon.spy();
    const dispatchResult = mapDispatchToProps(dispatchSpy);
    dispatchResult.signIn(mockUser);
    expect(dispatchSpy.callCount).toEqual(1);
  });

  it("should map state to Props", () => {
    const mapStateResult = mapStateToProps(mockStore);
    expect(mapStateResult.singInStatus).toEqual("Success");
  });

  //   it("should call history.push", () => {
  //     const addedProps = { ...props, signUpStatus: signUpSuccess };
  //     const alteredWrapper = shallow(<Login {...addedProps} />);
  //     expect(alteredWrapper.instance().props.history.push).toHaveBeenCalled();
  //   });

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

  it("should call props.signIn", () => {
    let prevented = false;
    wrapper.setState({
      email: mockUser.email,
      password: mockUser.password
    });
    const formElement = wrapper.find("form");
    formElement.simulate("submit", {
      preventDefault: () => {
        prevented = true;
      }
    });
    expect(wrapper.instance().props.signIn).toHaveBeenCalled();
  });

  it("should call history.push", () => {
    const addedProps = { ...props, singInStatus: signInSuccess };
    const alteredWrapper = shallow(<Login {...addedProps} />);
    alteredWrapper.setProps({
      role: true
    });
    expect(alteredWrapper.instance().props.history.push).toHaveBeenCalled();
  });
  it("should call history.push", () => {
    const addedProps = { ...props, singInStatus: signInSuccess };
    const alteredWrapper = shallow(<Login {...addedProps} />);
    alteredWrapper.setProps({
      role: false
    });
    expect(alteredWrapper.instance().props.history.push).toHaveBeenCalled();
  });
  it("should call history.push", () => {
    // const addedProps = { ...props };
    const alteredWrapper = shallow(<Login {...props} />);
    alteredWrapper.setProps({
      errorMessage: "Error"
    });
    
    // const toastSpy = jest.spyOn(toast, 'error')
    // // const toastSpy = toast(warn)
    // // const toastSpy = toast(mockToast);
    // expect(toastSpy).toHaveBeenCalledWith('Error');
  });
});
