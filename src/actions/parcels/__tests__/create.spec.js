import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import createParcels from "../createOrders";
import {
  createOrderSuccess,
  createOrderFailure,
  signInFailure,
  signInSuccess
} from "../../../types/types";
// import getPostsMock from "../../mocks/getPostsMock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({ posts: {} });
const mockParcel = {};

describe("Parcel actions", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should dispatch success", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201
      });
    });

    const expectedActions = [
      {
        type: createOrderSuccess
      }
    ];

    return store.dispatch(createParcels(mockParcel)).then(() => {
      // return of async actions
      //   console.log(store.getActions());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should dispatch sign in failure", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          message: "Invalid Email or Password"
        }
      });
    });

    const expectedActions = { type: createOrderFailure };

    return store.dispatch(createParcels({})).then(() => {
      expect(store.getActions()[1]).toEqual(expectedActions);
    });
  });
});
