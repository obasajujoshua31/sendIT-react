import React from "react";
import ReactModal from "react-modal";
import {
  AdminViewOrders,
  mapDispatchToProps,
  mapStateToProps
} from "../viewOrders";
import { shallow } from "enzyme";
import sinon from "sinon";
import { signInSuccess, signInFailure } from "../../../types/types";

const props = {
  userParcels: [],
  loadParcels: jest.fn(),
  history: {
    push: jest.fn()
  },
  authStatus: "",
  userParcels: {
    data: {}
  },
  role: false
};

  const mockParcels =  [
    {
      parcel: {
        id: "1",
        status: "PLACED"
      }
    },
    {
      parcel: {
        id: "2",
        status: "DELIVERED"
      }
    },
    {
      parcel: {
        id: "3",
        status: "TRANSITING"
      }
    },
    {
      parcel: {
        id: "4",
        status: "CANCELLED"
      }
    }
  ]

const mockStore = {
  users: {
    singInStatus: signInSuccess
  },
  parcels: {
    parcels: ["Beans"]
  },
  role: false
};
const wrapper = shallow(<AdminViewOrders {...props} />);

describe("Test for User AdminViewOrders", () => {
  it("should render AdminViewOrders component", () => {
    wrapper.setState({
      isLoading: false
    });
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

  it("should render view orders", () => {
    wrapper.setState({
      parcels: mockParcels
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should call history.push", () => {
    const adminWrapper = shallow(<AdminViewOrders {...props} />);

    adminWrapper.setProps({
      authStatus: signInFailure,
      userParcels: mockParcels
    });
    
    expect(wrapper.instance().props.history.push).toBeCalled();
  });

  it("should call render parcels", () => {
    wrapper.setState({
      parcels: mockParcels,
      showModal: false
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("state modal should be true", () => {
    const viewSpy = jest.spyOn(wrapper.instance(), "onHandleViewOrder");
    viewSpy("1");
    expect(wrapper.instance().state.showModal).toEqual(true);
  });

  it("close Modal should set state to false", () => {
    const viewSpy = jest.spyOn(wrapper.instance(), "closeModal");
    wrapper.setState({
      parcels: mockParcels
    });
    viewSpy();
    expect(wrapper.instance().state.showModal).toEqual(false);
  });
});
