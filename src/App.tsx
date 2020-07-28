import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/routes/Home/Home";
import { Navbar } from "./components/global/Navbar/Navbar";
import { State } from "./data/state";
import { StateInterface } from "./data/interfaces/data";

/// Styles
import "./scss/global.scss";
import { Question } from "./components/routes/Question/Question";

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
          <Route path="/" exact component={Home} />
          <Route path="/question/:id" exact component={Question} />
        </Switch>
      </Router>
    );
  }
}

export default App;
