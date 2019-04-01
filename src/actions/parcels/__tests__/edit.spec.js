import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import editParcelDestination from "../editParcel";
import {
  updateParcel,
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
          message: "Parcel destination changed successfully"
        }
      });
    });

    const expectedActions = [
      {
        type: signInSuccess,
        errorMessage: ""
      },
      {
        type: updateParcel,
        payload: { message: "Parcel destination changed successfully" }
      }
    ];

    return store.dispatch(editParcelDestination("2", "Lagos")).then(() => {
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

    const expectedActions = { type: signInFailure };

    return store.dispatch(editParcelDestination("1", "Abuja")).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
    });
  });
});
