import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import {
  mapDispatchToProps,
  mapStateToProps,
  CancelParcelOrder
} from "../cancelOrder";

const props = {
  parcelId: "1",
  role: false,
  history: {
    push: jest.fn()
  },
  show: true,
  status: "PLACED",
  closeCancel: false,
  cancelParcelOrder: jest.fn(),
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


const wrapper = shallow(<CancelParcelOrder {...props} />);

describe("Edit CancelParcelOrder Test", () => {
  it("should render Edit CancelParcelOrder", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("dispatch should call loadOneParcel", () => {
    const dispatchSpy = sinon.spy();
    const dispatchResult = mapDispatchToProps(dispatchSpy);
    dispatchResult.cancelParcelOrder("1");
    expect(dispatchSpy.callCount).toEqual(1);
  });

  it("map state to props should return parcels", () => {
    const mapStateResult = mapStateToProps(mockStore);
    expect(mapStateResult.parcelStatus).toEqual(true);
  });

  it("cancelParcel should call props.cancelParcelStatus", () => {
    const cancelParcelSpy = jest.spyOn(wrapper.instance(), "cancelParcel");
    cancelParcelSpy(mockSubmit);
    expect(wrapper.instance().props.cancelParcelOrder).toBeCalledWith("1");
  });

 
  it("should call props.history.push when parcelStatus is true", () => {
      wrapper.setProps({
          parcelStatus: true
      });
      expect(wrapper.instance().props.history.push).toBeCalledWith(
          "/dashboard"
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
