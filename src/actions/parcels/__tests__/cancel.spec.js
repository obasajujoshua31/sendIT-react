import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import cancelParcel from "../cancelParcel";
import {
  cancelOrder,
  signInFailure,
  signInSuccess
} from "../../../types/types";
// import getPostsMock from "../../mocks/getPostsMock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({ posts: {} });

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
        status: 200,
        response: {
          message: "Parcel Cancelled successfully"
        }
      });
    });

    const expectedActions = [
      {
        type: signInSuccess,
        errorMessage: ""
      },
      {
        type: cancelOrder,
        payload: { message: "Parcel Cancelled successfully" }
      }
    ];

    return store.dispatch(cancelParcel("2")).then(() => {
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
          message: "Not UnAuthorized"
        }
      });
    });

    const expectedActions = { type: signInFailure };

    return store.dispatch(cancelParcel("2")).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
    });
  });
});
