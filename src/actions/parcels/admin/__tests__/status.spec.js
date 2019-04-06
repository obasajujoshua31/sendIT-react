import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import changeStatus from "../status";
import {
  updateParcelStatus,
  signInFailure,
  signInSuccess
} from "../../../../types/types";
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
        status: 200
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
        type: updateParcelStatus
      }
    ];

    return store.dispatch(changeStatus(4, "CANCELLED")).then(() => {
      // return of async actions
      // console.log(store.getActions());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should dispatch sign in failure", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: "Invalid Email or Password"
        }
      });
    });

    const expectedActions = { type: signInFailure };

    return store.dispatch(changeStatus(5, "CANCELLED")).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
    });
  });
});
