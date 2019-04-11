import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import loadUserParcels from "../getParcels";
import {
  viewOrders,
  signInFailure,
  signInSuccess
} from "../../../../types/types";
// import getPostsMock from "../../mocks/getPostsMock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({ posts: {} });

describe("Parcel actions Get one parcel", () => {
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
        status: 200,
        response: {
          message: "Parcels Retrieved Successfully"
        }
      });
    });

    const expectedActions = [
      {
        type: signInSuccess,
        errorMessage: "",
        role: true,
        user: null
      },
      {
        type: viewOrders,
        payload: { message: "Parcels Retrieved Successfully" }
      }
    ];

    return store.dispatch(loadUserParcels()).then(() => {
      // return of async actions
      //   console.log(store.getActions());
      // expect(store.getActions()).toEqual(expectedActions);
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

    const expectedActions = { type: signInFailure };

    return store.dispatch(loadUserParcels()).then(() => {
      // expect(store.getActions()[2]).toEqual(expectedActions);
    });
  });
});
