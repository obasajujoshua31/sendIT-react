import React from "react";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import { Navbar, mapDispatchToProps, mapStateToProps } from "../Navbar";
import { signInSuccess } from "../../../types/types";

const props = {
  logout: jest.fn(),
  singInstatus: "",
  history: {
    push: jest.fn()
  },
  role: ""
};

const mockStore = {
  users: {
    singInStatus: "Success",
    role: false
  }
};

describe("<Navbar>", () => {
  const wrapper = shallow(<Navbar {...props} />);
  it("should render a navbar component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should call dispatch action", () => {
    const dispatchSpy = sinon.spy();
    // console.log(mapDispatchToProps)
    const dispatchResult = mapDispatchToProps(dispatchSpy);
    // console.log(dispatchResult);
    dispatchResult.logout();
    expect(dispatchSpy.callCount).toEqual(1);
  });
  it("should map state to Props", () => {
    const mapStateResult = mapStateToProps(mockStore);
    expect(mapStateResult.singInStatus).toEqual("Success");
  });

  it("should call logout", () => {
    const alteredProps = { ...props, singInStatus: signInSuccess };
    const navWrapper = shallow(<Navbar {...alteredProps} />);
    navWrapper.find("a").simulate("click");
    expect(navWrapper).toMatchSnapshot();
  });

  it("should render 3 li tags if it is Admin", () => {
    wrapper.setProps({
      singInStatus: signInSuccess,
      role: true
    });
    expect(wrapper.find("li").length).toEqual(3);
  });
});
