import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./routes/Home/Component";
import { Navbar } from "./components/Navbar/Component";
import { State } from "./services/state/state";
import { GlobalStateInterface } from "./services/state/interfaces";
import { Question } from "./routes/Question/Component";
import { LeftSidebar } from "./components/LeftSidebar/Component";
import { Data } from "./services/data/data";

class App extends React.Component {
  state: GlobalStateInterface = {};

  async componentDidMount() {
    await Data.prepareData();
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
