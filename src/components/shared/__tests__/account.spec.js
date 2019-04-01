import React from "react";
import { shallow, mount } from "enzyme";
import sinon from 'sinon';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import AccountContent, { mapDispatchToProps } from "../AccountContent";

const props = {
  loadParcels: jest.fn(),
  history: {
    push: jest.fn()
  }
};
const initialState = {
  users: {
    singInStatus: "",
    errorMessage: "",
    errorMsg: "",
    signUpStatus: "",
    role: false,
    user: {}
  }
};
const mockStore = configureStore([thunk]);
beforeEach(() => {});
describe("<Account Content> With Connect", () => {
  const store = mockStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <AccountContent {...props} />
      </Router>
    </Provider>
  );
  it("should render Account Content Component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
