import React from "react";
import {
  AdminDashboard,
  mapDispatchToProps,
  mapStateToProps
} from "../dashboard";
import { shallow } from "enzyme";
import sinon from "sinon";
import { signInSuccess, signInFailure } from "../../../types/types";

const props = {
  userParcels: [],
  loadParcels: jest.fn(),
  history: {
    push: jest.fn()
  },
  authStatus: signInSuccess
};

const mockParcels = {
  data: [
    {
      parcel: {
        status: "PLACED"
      }
    },
    {
      parcel: {
        status: "DELIVERED"
      }
    },
    {
      parcel: {
        status: "TRANSITING"
      }
    },
    {
      parcel: {
        status: "CANCELLED"
      }
    }
  ]
};

const mockStore = {
  users: {
    singInStatus: signInSuccess
  },
  parcels: {
    parcels: ["Beans"]
  }
};
const wrapper = shallow(<AdminDashboard {...props} />);

describe("Test for User AdminDashboard", () => {
  it("should render AdminDashboard component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should dispatch loadparcels", () => {
    const dispatchSpy = sinon.spy();
    const dispatchResult = mapDispatchToProps(dispatchSpy);
    dispatchResult.loadParcels();
    expect(dispatchSpy.callCount).toEqual(1);
  });

  it("should return new object for mapstate to props", () => {
    const stateToPropsResult = mapStateToProps(mockStore);
    expect(stateToPropsResult.userParcels).toEqual(["Beans"]);
    expect(stateToPropsResult.authStatus).toEqual(signInSuccess);
  });

  it("should ", () => {
    const dashboardWrapper = shallow(<AdminDashboard {...props} />);
    dashboardWrapper.setProps({
      userParcels: mockParcels
    });
    expect(dashboardWrapper).toMatchSnapshot();
  });

  it("should call history.push", () => {
    const dashboardWrapper = shallow(<AdminDashboard {...props} />);
    dashboardWrapper.setState({
      authStatus: ""
    });
    dashboardWrapper.setProps({
      authStatus: signInFailure
    });
    expect(dashboardWrapper.instance().props.history.push).toBeCalled();
  });

  it("render when there is no change in props", () => {
    const dashboardWrapper = shallow(<AdminDashboard {...props} />);
    dashboardWrapper.setState({
      authStatus: signInFailure
    });
    dashboardWrapper.setProps({
      authStatus: signInFailure
    });
    expect(dashboardWrapper).toMatchSnapshot();
  });
});
