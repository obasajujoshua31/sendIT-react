import React from "react";
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Showcase from "../pages/Showcase";

const Navbar = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <Route exact path="/" component={Showcase} />
      </div>
    </Router>
  );
};

export default Navbar;
