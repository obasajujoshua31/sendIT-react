import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";

import Base from "./components/App";

const App = () => (
  <Fragment>
    <Base />
    <ToastContainer autoClose={2500} />
  </Fragment>
);

ReactDOM.render(<App />, document.getElementById("app"));
