import React from "react";
import { State } from "../../data/state";
import { StateInterface } from "../../data/interfaces";

export class Home extends React.Component {
  state: any = {};

  componentDidMount() {
    State.state.subscribe((state: StateInterface) => {
      this.setState(state);
    });
  }

  render() {
    return (
      <div
        onClick={() => {
          State.setState({ name: "Yogesh" });
        }}
      >
        Home! {this.state.name}
      </div>
    );
  }
}
