import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/routes/Home/Home";
import { Navbar } from "./components/global/Navbar/Navbar";
import { State } from "./data/state";
import { StateInterface } from "./data/interfaces/data";

/// Styles
import "./scss/global.scss";

class App extends React.Component {
  state: StateInterface = {};

  componentDidMount() {
    State.state.subscribe((state: StateInterface) => {
      this.setState(state);
    });
  }

  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
