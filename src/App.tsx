import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/routes/Home/Home";
import { Navbar } from "./components/global/Navbar/Navbar";
import { State } from "./data/state";
import { GlobalStateInterface } from "./data/interfaces/data";

/// Styles
import "./scss/global.scss";
import { Question } from "./components/routes/Question/Question";
import { LeftSidebar } from "./components/global/LeftSidebar/LeftSidebar";

class App extends React.Component {
  state: GlobalStateInterface = {};

  componentDidMount() {
    State.state.subscribe((state: GlobalStateInterface) => {
      this.setState(state);
    });
  }

  render() {
    return (
      <Router>
        <Navbar />
        <div className="root">
          <div>
            <LeftSidebar />
          </div>
          <main>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/question/:id" exact component={Question} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
