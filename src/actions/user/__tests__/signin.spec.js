import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import signInUser from "../signin";
import { signInSuccess, signInFailure } from "../../../types/types";
// import getPostsMock from "../../mocks/getPostsMock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({ posts: {} });

const mockUser = {
  email: "monkey@gorilla.com",
  password: "animal"
};

describe("User actions", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should dispatch signin success", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          user: {
            isAdmin: false
          },
          message: "User signed in successfully",
          token: "xkdljsldjdo"
        }
      });
    });

    const expectedActions = [
      {
        type: signInSuccess,
        errorMessage: "",
        errorMessage: "",
        user: {
          isAdmin: false
        },
        role: false
      }
    ];

    return store.dispatch(signInUser(mockUser)).then(() => {
      // return of async actions
      //   console.log(store.getActions());
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

    return store.dispatch(signInUser(mockUser)).then(() => {
      // console.log(store.getActions());
      // return of async actions
      expect(store.getActions()[1]).toEqual(expectedActions);
    });
  });
});
