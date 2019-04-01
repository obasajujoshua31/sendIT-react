import React from "react";
import { shallow } from "enzyme";
import HomePage from "../Homepage";
import Showcase from "../Showcase";

describe("<HOmePage>", () => {
  const wrapper = shallow(<HomePage />);
  it("should render Home page", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should contain 1 <div>", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });
});

describe("<Show Case>", () => {
  const wrapper = shallow(<Showcase />);
  it("should render show case component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should contain 3 divs", () => {
    expect(wrapper.find("div").length).toEqual(3);
  });
});
