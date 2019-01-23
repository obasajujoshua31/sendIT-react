import React, { Component } from "react";
import "../sass/main.scss";
import Homepage from "./pages/Homepage";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to my react App</h1>
        <Homepage />
      </div>
    );
  }
}
export default App;
