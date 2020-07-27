import React from "react";
import { State } from "../../data/state";
import { StateInterface } from "../../data/interfaces/data";

export class Home extends React.Component {
  state: any = {};

  componentDidMount() {
    State.state.subscribe((state: StateInterface) => {
      this.setState(state);
    });
  }

  render() {
    return <div>Home! {this.state.name}</div>;
  }
}
