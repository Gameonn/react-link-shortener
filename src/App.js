import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";

import Header from "./Header/Header";
import Home from "./Home/Home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route path="/" component={Home} />
      </div>
    );
  }
}

export default App;
