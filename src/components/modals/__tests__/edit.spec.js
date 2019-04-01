import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import { Modal, mapDispatchToProps, mapStateToProps } from "../edit";
import { wrap } from "module";

const props = {
  parcelId: "1",
  role: false,
  userParcel: {
    data: []
  },
  loadOneParcel: jest.fn(),
  show: true,
  handleCloseModal: jest.fn()
};
const mockStore = {
  parcels: {
    parcel: {
      data: ["fish"]
    }
  }
};

const mockState = {
  parcel: [
    {
      parcel_name: "phone",
      destination: "dkkdkd",
      pick_up_location: "dkld",
      sent_on: "slldd",
      delivered_on: "ldlldd",
      weight_metric: "kg",
      weight: 32,
      status: "PLACED",
      present_location: "dlddld",
      parcel_id: 1
    }
  ]
};

const wrapper = shallow(<Modal {...props} />);

describe("Edit Modal Test", () => {
  it("should render Edit Modal", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("dispatch should call loadOneParcel", () => {
    const dispatchSpy = sinon.spy();
    const dispatchResult = mapDispatchToProps(dispatchSpy);
    dispatchResult.loadOneParcel("1", false);
    expect(dispatchSpy.callCount).toEqual(1);
  });

  it("map state to props should return parcels", () => {
    const mapStateResult = mapStateToProps(mockStore);
    expect(mapStateResult.userParcel).toEqual({ data: ["fish"] });
  });

  it("editParcel should set State to true", () => {
    const editParcelSpy = jest.spyOn(wrapper.instance(), "editParcel");
    editParcelSpy();
    expect(wrapper.instance().state.showEditModal).toEqual(true);
  });

  it("closeParcelModal should set State to false", () => {
    const editParcelSpy = jest.spyOn(wrapper.instance(), "closeParcelModal");
    editParcelSpy();
    expect(wrapper.instance().state.showEditModal).toEqual(false);
  });

  it("showCancelOrder should set State to true", () => {
    const editParcelSpy = jest.spyOn(wrapper.instance(), "showCancelOrder");
    editParcelSpy();
    expect(wrapper.instance().state.showCancelModal).toEqual(true);
  });

  it("closeCancelModal should set State to false", () => {
    const editParcelSpy = jest.spyOn(wrapper.instance(), "closeCancelModal");
    editParcelSpy();
    expect(wrapper.instance().state.showCancelModal).toEqual(false);
  });

  it("should render when the role is false", () => {
    wrapper.setProps({
      role: false
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render when the role is true", () => {
    wrapper.setProps({
      role: true
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render modal when parcel is in the state", () => {
    wrapper.setState({
      parcel: mockState.parcel
    });
    expect(wrapper).toMatchSnapshot();
  });
});
