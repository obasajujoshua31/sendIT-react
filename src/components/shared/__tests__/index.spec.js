import React from "react";
import { shallow } from "enzyme";
import Footer from "../Footer";
import About from "../About";
import PageFooter from "../PageFooter";
import PageHeader from "../PageHeader";

describe("Shared Components Test", () => {
  describe("<Footer>", () => {
    const wrapper = shallow(<Footer />);
    it("should render a footer component", () => {
      expect(wrapper).toMatchSnapshot();
    });
    it("should contain a <p> tag", () => {
      expect(wrapper.find("p").length).toEqual(1);
    });
  });

  describe("<About>", () => {
    const wrapper = shallow(<About />);
    it("should render about component", () => {
      expect(wrapper).toMatchSnapshot();
    });
    it("should contain 2 <h1> tag", () => {
      expect(wrapper.find("h1").length).toEqual(2);
    });
    it("should contain 4 <h3> tag", () => {
      expect(wrapper.find("h3").length).toEqual(4);
    });
    it("should contain 5 <p> tag", () => {
      expect(wrapper.find("p").length).toEqual(5);
    });
    it("should contain 4 <img> tag", () => {
      expect(wrapper.find("img").length).toEqual(4);
    });
    it("should contain 9 <div> tag", () => {
      expect(wrapper.find("div").length).toEqual(9);
    });
  });

  describe("<PageFooter>", () => {
    const wrapper = shallow(<PageFooter />);
    it("should render a page footer component", () => {
      expect(wrapper).toMatchSnapshot();
    });
    it("should contain 1 <div> tag", () => {
      expect(wrapper.find("div").length).toEqual(1);
    });
    it("should contain 1 <h1> tag", () => {
      expect(wrapper.find("h1").length).toEqual(1);
    });
    it("should contain 1 <Link> tag", () => {
      expect(wrapper.find("Link").length).toEqual(1);
    });
  });

  describe("<PageHeader>", () => {
    const wrapper = shallow(<PageHeader />);
    it("should render a page footer component", () => {
      expect(wrapper).toMatchSnapshot();
    });
    it("should contain 7 <div> tag", () => {
      expect(wrapper.find("div").length).toEqual(7);
    });
    it("should contain 1 <h1> tag", () => {
      expect(wrapper.find("h1").length).toEqual(1);
    });
    it("should contain 3 <span> tag", () => {
      expect(wrapper.find("span").length).toEqual(3);
    });
    it("should contain 1 <header> tag", () => {
      expect(wrapper.find("header").length).toEqual(1);
    });
    it("should contain 1 <nav> tag", () => {
      expect(wrapper.find("nav").length).toEqual(1);
    });
    it("should contain 2 <i> tag", () => {
      expect(wrapper.find("i").length).toEqual(2);
    });
    it("should contain 4 <p> tag", () => {
      expect(wrapper.find("p").length).toEqual(4);
    });
  });
});
