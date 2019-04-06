import React from "react";
import { Dashboard, mapDispatchToProps, mapStateToProps } from "../dashboard";
import { shallow } from "enzyme";
import sinon from "sinon";
import { signInSuccess, signInFailure } from "../../../types/types";

const props = {
  userParcels: [],
  loadParcels: jest.fn(),
  history: {
    push: jest.fn()
  }
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
const wrapper = shallow(<Dashboard {...props} />);
describe("Test for User Dashboard", () => {
  it("should render Dashboard component", () => {
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
    const dashboardWrapper = shallow(<Dashboard {...props} />);
    dashboardWrapper.setProps({
      userParcels: mockParcels
    });
  });

  it("should call history.push", () => {
    const dashboardWrapper = shallow(<Dashboard {...props} />);
    dashboardWrapper.setProps({
      authStatus: signInFailure
    });
    expect(dashboardWrapper.instance().props.history.push).toBeCalled();
  });
});
