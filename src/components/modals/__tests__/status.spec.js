import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import { mapDispatchToProps, mapStateToProps, ChangeStatus } from "../status";

const props = {
  parcelId: "1",
  role: false,
  history: {
    push: jest.fn()
  },
  show: true,
  status: "PLACED",
  closeCancel: false,
  changeParcelStatus: jest.fn(),
  destination: "dkkdkd",
  parcelStatus: false
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
    value,
    name: "status"
  }
});

const wrapper = shallow(<ChangeStatus {...props} />);

describe("Edit ChangeStatus Test", () => {
  it("should render Edit ChangeStatus", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("dispatch should call loadOneParcel", () => {
    const dispatchSpy = sinon.spy();
    const dispatchResult = mapDispatchToProps(dispatchSpy);
    dispatchResult.changeParcelStatus("1", "TRANSITING");
    expect(dispatchSpy.callCount).toEqual(1);
  });

  it("map state to props should return parcels", () => {
    const mapStateResult = mapStateToProps(mockStore);
    expect(mapStateResult.parcelStatus).toEqual(true);
  });

  it("changeStatus should call props.changeParcelStatus", () => {
    const changeParcelSpy = jest.spyOn(wrapper.instance(), "changeStatus");
    changeParcelSpy(mockSubmit);
    expect(wrapper.instance().props.changeParcelStatus).toBeCalledWith(
      "1",
      "PLACED"
    );
  });

  it("handle change should set errors when e.target.value is not defined", () => {
    const handleChangeSpy = jest.spyOn(wrapper.instance(), "handleChange");

    handleChangeSpy(mockHandleChange("TRANSITING"));
    expect(wrapper.instance().state.status).toEqual("TRANSITING");
  });

  it("componentDidMount should set state to this.prop.status", () => {
    const componentSpy = jest.spyOn(wrapper.instance(), "componentDidMount");

    wrapper.setProps({
      status: "TRANSITING"
    });
    componentSpy();
    expect(wrapper.instance().state.status).toEqual("TRANSITING");
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
