import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import registerUser from "../signup";
import {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure
} from "../../../types/types";
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

  it("should dispatch signup success", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: "User signed up successfully",
          token: "xkdljsldjdo"
        }
      });
    });

    const expectedActions = [{ type: signUpSuccess, errorMessage: "" }];

    return store.dispatch(registerUser(mockUser)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should dispatch sign up failure", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: "User already exists"
        }
      });
    });

    const expectedActions = { type: signUpFailure };

    return store.dispatch(registerUser(mockUser)).then(() => {
      // console.log(store.getActions());
      // return of async actions
      expect(store.getActions()[1]).toEqual(expectedActions);
    });
  });
});
