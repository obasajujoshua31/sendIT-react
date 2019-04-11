import React from "react";
import ReactModal from "react-modal";
import { ViewOrders, mapDispatchToProps, mapStateToProps } from "../viewOrders";
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
  role: false
};


  const mockParcels = [
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
const wrapper = shallow(<ViewOrders {...props} />);
describe("Test for User ViewOrders", () => {
  it("should render ViewOrders component", () => {
    wrapper.setState({
      isLoading: false,
      showModal: false
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
    const viewOrderWrapper = shallow(<ViewOrders {...props} />);
    viewOrderWrapper.setProps({
      userParcels: mockParcels
    });
    expect(viewOrderWrapper).toMatchSnapshot();
  });

  it("should call history.push", () => {
    const viewOrderWrapper = shallow(<ViewOrders {...props} />);
    viewOrderWrapper.setProps({
      authStatus: signInFailure
    });
    expect(viewOrderWrapper.instance().props.history.push).toBeCalled();
  });

  it("should call render parcels", () => {
    const viewOrderWrapper = shallow(<ViewOrders {...props} />);
    viewOrderWrapper.setState({
      parcels: mockParcels,
      showModal: false,
      isLoading: false
    });
    expect(viewOrderWrapper).toMatchSnapshot();
  });

  it("state modal should be false", () => {
    const viewOrderWrapper = shallow(<ViewOrders {...props} />);
    const viewSpy = jest.spyOn(
      viewOrderWrapper.instance(),
      "onHandleViewOrder"
    );
    viewOrderWrapper.setState({
      parcels: mockParcels
    });
    viewSpy("1");
    expect(viewOrderWrapper.instance().state.showModal).toEqual(true);
  });

  it("close Modal should set state to false", () => {
    const viewOrderWrapper = shallow(<ViewOrders {...props} />);
    const viewSpy = jest.spyOn(viewOrderWrapper.instance(), "closeModal");
    viewOrderWrapper.setState({
      parcels: mockParcels
    });
    viewSpy();
    expect(viewOrderWrapper.instance().state.showModal).toEqual(false);
  });
});
