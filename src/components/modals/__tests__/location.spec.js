import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import {
  mapDispatchToProps,
  mapStateToProps,
  ChangeLocation
} from "../location";

const props = {
  parcelId: "1",
  role: false,
  history: {
    push: jest.fn()
  },
  show: true,
  presentLocation: "joshua",
  editLocation: jest.fn(),
  destination: "dkkdkd",
  parcelStatus: false,
  closeChangeLocation: jest.fn()
};
const mockStore = {
  parcels: {
    parcelStatus: true
  }
};
const mockSubmit = {
  preventDefault: jest.fn()
};

const mockHandleChange = value => ({
  target: {
    value
  }
});

const wrapper = shallow(<ChangeLocation {...props} />);

describe("Edit ChangeLocation Test", () => {
  it("should render Edit ChangeLocation", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("dispatch should call loadOneParcel", () => {
    const dispatchSpy = sinon.spy();
    const dispatchResult = mapDispatchToProps(dispatchSpy);
    dispatchResult.editLocation("1", "Abuja");
    expect(dispatchSpy.callCount).toEqual(1);
  });

  it("map state to props should return parcels", () => {
    const mapStateResult = mapStateToProps(mockStore);
    expect(mapStateResult.parcelStatus).toEqual(true);
  });

  it("handleCloseModal should set setLocationModal state to false", () => {
    const handleCloseSpy = jest.spyOn(wrapper.instance(), "handleCloseModal");

    handleCloseSpy();
    expect(wrapper.instance().state.showLocationModal).toEqual(false);
  });

  it("changePresentLocation should not call props.editLocation wgeb there is error", () => {
    const changeLocationSpy = jest.spyOn(
      wrapper.instance(),
      "changePresentLocation"
    );
    wrapper.setState({
      formError: "kandoki"
    });
    changeLocationSpy(mockSubmit);
    expect(wrapper.instance().props.editLocation).not.toBeCalled();
  });

  it("changePresentLocation should call props.editLocation", () => {
    const changeLocationSpy = jest.spyOn(
      wrapper.instance(),
      "changePresentLocation"
    );
    wrapper.setState({
      presentLocation: "Abuja",
      formError: ""
    });
    changeLocationSpy(mockSubmit);
    expect(wrapper.instance().props.editLocation).toBeCalledWith("1", "Abuja");
  });

  it("handle change should set errors when e.target.value is not defined", () => {
    const handleChangeSpy = jest.spyOn(wrapper.instance(), "handleChange");

    handleChangeSpy(mockHandleChange(""));
    expect(wrapper.instance().state.formError).toEqual(
      "Present Location cannot be empty"
    );
  });

  it("handle change should set presentLocation when e.target.value is defined", () => {
    const handleChangeSpy = jest.spyOn(wrapper.instance(), "handleChange");

    handleChangeSpy(mockHandleChange("Abuja"));
    expect(wrapper.instance().state.presentLocation).toEqual("Abuja");
  });

  it("componentDidMount should set state to this.prop.presentLocation", () => {
    const componentSpy = jest.spyOn(wrapper.instance(), "componentDidMount");

    wrapper.setProps({
      presentLocation: "Abuja"
    });
    componentSpy();
    expect(wrapper.instance().state.presentLocation).toEqual("Abuja");
  });

  it("should call props.history.push when parcelStatus is true", () => {
    wrapper.setProps({
      parcelStatus: true
    });
    expect(wrapper.instance().props.history.push).toBeCalledWith(
      "/admin-dashboard"
    );
  });

  it("should render status modal if state is the same as props", () => {
    wrapper.setState({
      parcelStatus: false
    });
    wrapper.setProps({
      parcelStatus: false
    });
    expect(wrapper).toMatchSnapshot();
  });
});
