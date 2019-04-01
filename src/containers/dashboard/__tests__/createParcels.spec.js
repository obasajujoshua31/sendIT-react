import React from "react";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import { CreateOrder, mapDispatchToProps } from "../createParcels";
import { signInFailure, signInSuccess } from "../../../types/types";

const props = {
  signUp: jest.fn(),
  history: {
    push: jest.fn()
  },
  errorMsg: "",
  signUpStatus: "",
  authStatus: "",
  createdStatus: "",
  createParcel: jest.fn(),
  loadParcels: jest.fn()
};

const mockParcel = {
  parcelName: "Monkey",
  destination: "Gorilla",
  pickUpLocation: "monkeygorillacom",
  weight: 34,
  weightMetric: "Kg"
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
    parcelName: "",
    destination: "",
    pickUpLocation: "",
    weight: "",
    weightMetric: ""
  }
};

const wrapper = shallow(<CreateOrder {...props} />);

describe(" <CreateOrder> ", () => {
  it("should render CreateOrder Component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("componentDidMount should call loadparcels", () => {
    const componentSpy = jest.spyOn(wrapper.instance(), "componentDidMount");

    componentSpy();
    expect(wrapper.instance().props.loadParcels).toBeCalled();
  });

  it("should set the parcelName field to test", () => {
    wrapper.setState({ isLoading: false });
    wrapper
      .find("input")
      .at(0)
      .simulate("change", {
        target: {
          value: "test",
          name: "parcelName"
        }
      });
    expect(wrapper.instance().state.parcelName).toEqual("test");
  });

  it("handle change with valid input should set isDeactivated to false", () => {
    wrapper.setState({
      formErrors: validState.formErrors,
      parcelName: "kddkkd",
      weight: 4,
      weightMetric: "Kg",
      destination: "lldldd",
      pickUpLocation: "dldlldll"
    });

    wrapper
      .find("input")
      .at(0)
      .simulate("change", {
        target: {
          value: "dkkdkkd",
          name: "parcelName"
        }
      });
    // console.log(wrapper.instance().state)
    expect(wrapper.instance().state.isDeactivated).toEqual(false);
  });

  it("should call dispatch action", () => {
    const dispatchSpy = sinon.spy();
    const dispatchResult = mapDispatchToProps(dispatchSpy);
    dispatchResult.loadParcels();
    dispatchResult.createParcel(mockParcel);
    expect(dispatchSpy.callCount).toEqual(2);
  });

  it("should call history.push", () => {
    wrapper.setProps({
      authStatus: signInFailure
    });

    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
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
      parcelName: "",
      destination: ""
    });
    submitSpy(mockSubmit);
    expect(wrapper).toMatchSnapshot();
  });

  it("should re render when there is error in the form", () => {
    wrapper.setState({
      formErrors: {
        parcelName: "kdkdkddkkd",
        destination: "llld",
        pickUpLocation: "kdkdkkd",
        weight: "kdkdkkd"
      }
    });
    wrapper
      .find("input")
      .at(0)
      .simulate("change", {
        target: {
          value: "test",
          name: ""
        }
      });

    expect(wrapper.instance().state.isDeactivated).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });

  it("should call props.createParcel", () => {
    let prevented = false;
    wrapper.setState({
      formErrors: validState.formErrors,
      parcelName: mockParcel.parcelName,
      destination: mockParcel.destination,
      pickUpLocation: mockParcel.pickUpLocation,
      weight: mockParcel.weight,
      weightMetric: mockParcel.weightMetric
    });
    const formElement = wrapper.find("form");
    formElement.simulate("submit", {
      preventDefault: () => {
        prevented = true;
      }
    });
    expect(wrapper.instance().props.createParcel).toHaveBeenCalled();
  });

  it("should call history.push", () => {
    wrapper.setProps({
      createdStatus: true
    });

    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });

  it("should render when there the user is authenticated", () => {
    wrapper.setProps({
      authStatus: signInSuccess
    });
    expect(wrapper).toMatchSnapshot();
  });
});
