import React from "react";
import { Order } from "../order";
import { shallow } from "enzyme";
import sinon from "sinon";

const props = {
  onHandleViewOrder: jest.fn(),
  parcel: {
    parcel_id: "",
    parcel_name: "",
    destination: "",
    pick_up_location: "",
    sent_on: "",
    status: ""
  }
};

const wrapper = shallow(<Order {...props} />);
describe("Test for Parcel Order", () => {
  it("should render Dashboard component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onHandleViewOrder", () => {
    wrapper.find("tr").simulate("click");
    expect(wrapper.instance().props.onHandleViewOrder).toBeCalledWith(
      wrapper.instance().props.parcel.parcel_id
    );
  });
});
