import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/// Components
import NavbarComponent from "./components/Navbar";
import HomeComponent from "./components/Home";
/// Styles
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavbarComponent />
          <Switch>
            <Route path="/" exact component={HomeComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
