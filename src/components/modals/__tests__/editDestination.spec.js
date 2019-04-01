import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import {
  EditDestination,
  mapDispatchToProps,
  mapStateToProps
} from "../editDestination";

const props = {
  parcelId: "1",
  role: false,
  history: {
    push: jest.fn()
  },
  show: true,
  closeEdit: false,
  editDestination: jest.fn(),
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

const mockHandleChange = value => ({
  target: {
    value
  }
});

const wrapper = shallow(<EditDestination {...props} />);

describe("Edit EditDestination Test", () => {
  it("should render Edit EditDestination", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("dispatch should call loadOneParcel", () => {
    const dispatchSpy = sinon.spy();
    const dispatchResult = mapDispatchToProps(dispatchSpy);
    dispatchResult.editDestination("1", "dkkkldld");
    expect(dispatchSpy.callCount).toEqual(1);
  });

  it("map state to props should return parcels", () => {
    const mapStateResult = mapStateToProps(mockStore);
    expect(mapStateResult.parcelStatus).toEqual(true);
  });

  it("editParcel should set State to true", () => {
    const handleCloseSpy = jest.spyOn(wrapper.instance(), "handleCloseModal");
    handleCloseSpy();
    expect(wrapper.instance().state.showEditModal).toEqual(false);
  });

  it("componentDidMount should set destination to props.destination", () => {
    const componentSpy = jest.spyOn(wrapper.instance(), "componentDidMount");
    wrapper.setProps({
      destination: "joshua"
    });
    componentSpy();
    expect(wrapper.instance().state.destination).toEqual("joshua");
  });

  it("success edit destination should call history.push", () => {
    wrapper.setState({
      parcelStatus: false
    });
    wrapper.setProps({
      parcelStatus: true
    });
    expect(wrapper.instance().props.history.push).toBeCalled();
  });

  it("editParcel should not call editDestination when there is  error", () => {
    const editParcelSpy = jest.spyOn(wrapper.instance(), "editParcel");
    wrapper.setState({
      formError: "kdkkdkd"
    });
    wrapper.setProps({
      destination: "123"
    });
    editParcelSpy(mockSubmit);
    expect(wrapper.instance().props.editDestination).not.toBeCalled();
  });

  it("editParcel should not call editDestination when there is error", () => {
    const editSpy = jest.spyOn(wrapper.instance(), "editParcel");
    wrapper.setState({
      formError: ""
    });
    editSpy(mockSubmit);
    expect(wrapper.instance().props.editDestination).toBeCalled();
  });

  it("handle change should set destination to e.target.value", () => {
    const handleChangeSpy = jest.spyOn(wrapper.instance(), "handleChange");

    handleChangeSpy(mockHandleChange("joshua"));
    expect(wrapper.instance().state.destination).toEqual("joshua");
  });

  it("handle change should set errors when e.target.value is not defined", () => {
    const handleChangeSpy = jest.spyOn(wrapper.instance(), "handleChange");

    handleChangeSpy(mockHandleChange(""));
    expect(wrapper.instance().state.formError).toEqual(
      "Destination cannot be empty"
    );
  });
});
