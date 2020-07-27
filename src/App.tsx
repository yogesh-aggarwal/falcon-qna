import React from "react";
import { Home } from "./components/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { State } from "./data/state";
import { StateInterface } from "./data/interfaces/data";

class App extends React.Component {
  state: StateInterface = {};

  componentDidMount() {
    State.state.subscribe((state: StateInterface) => {
      this.setState(state);
    });
  }

  render() {
    return (
      <div>
        {this.state.name}
        <Navbar />
        <Home />
      </div>
    );
  }
}

export default App;
