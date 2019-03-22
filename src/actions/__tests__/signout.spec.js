import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import signOutUser from "../user/signout";
import { isLoggedOut } from "../../types/types";
// import getPostsMock from "../../mocks/getPostsMock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({ user: {} });

describe("User actions", () => {
  it("should dispatch signout success", () => {
    store.dispatch(signOutUser());
    expect(store.getActions()).toEqual([{ type: isLoggedOut }]);
  });
});
