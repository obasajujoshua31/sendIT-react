import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import users from "./reducers/userReducer";
import parcels from "./reducers/parcelReducer";

const store = createStore(
  combineReducers({ users, parcels }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
