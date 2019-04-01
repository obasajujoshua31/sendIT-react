import React from "react";
import sinon from "sinon";
import { shallow } from "enzyme";
import { AccountContent, mapDispatchToProps } from "../AccountContent";

const props = {
  loadParcels: jest.fn(),
  history: {
    push: jest.fn()
  }
};

describe("AccountContent", () => {
  const wrapper = shallow(<AccountContent {...props} />);
  it("should render Account Content component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should contain 1 <div> tag", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });
  it("should contain 1 <h1> tag", () => {
    expect(wrapper.find("h1").length).toEqual(1);
  });
  it("should contain 1 <p> tag", () => {
    expect(wrapper.find("p").length).toEqual(1);
  });
  it("should contain 1 <button> tag", () => {
    expect(wrapper.find("button").length).toEqual(1);
  });
  it("should call load parcels", () => {
    wrapper.find("button").simulate("click");
    expect(wrapper.instance().props.history.push).toHaveBeenCalledTimes(1);
  });
});
