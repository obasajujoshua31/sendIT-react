import React, { Component, Fragment } from "react";
import "../sass/main.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./shared/About";
import Login from "../containers/Account/Login";
import CreateAccount from "../containers/Account/Create";
import PageHeader from "./shared/PageHeader";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import store from "../store";
import { Provider } from "react-redux";
import ViewOrders from "../containers/dashboard/viewOrders";
import Dashboard from "../containers/dashboard/dashboard";
import createOrder from "../containers/dashboard/createParcels";
import AdminDashboard from "../containers/admin/dashboard";
import AdminViewOrders from "../containers/admin/viewOrders";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <PageHeader />
            <Navbar />
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/about/" component={About} />
              <Route path="/login/" component={Login} />
              <Route path="/signup/" component={CreateAccount} />
              <Route path="/view-orders/" component={ViewOrders} />
              <Route path="/dashboard/" component={Dashboard} />
              <Route path="/create-order" component={createOrder} />
              <Route path="/admin-dashboard/" component={AdminDashboard} />
              <Route path="/admin-view-orders/" component={AdminViewOrders} />
            </Switch>
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}
export default App;
