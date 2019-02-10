import React, { Component } from "react";
import "../sass/main.scss";
// import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./shared/About";
import Login from "./Account/Login";
import CreateAccount from "./Account/Create";
import PageHeader from "./shared/PageHeader";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <PageHeader />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/about" component={About} />
            <Route path="/login/" component={Login} />
            <Route path="/signup/" component={CreateAccount} />
          </Switch>
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}
export default App;
