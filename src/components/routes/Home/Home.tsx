import React from "react";
import { StateInterface } from "../../../data/interfaces/data";
import { UserState } from "../../../data/userState";

export class Home extends React.Component {
  state: any = {};

  componentDidMount() {
    UserState.state.subscribe((state: StateInterface) => {
      this.setState(state);
    });
  }

  render() {
    return (
      <div
        onClick={() => {
          UserState.state.next({ name: "Yogesh Aggarwal" });
        }}
      >
        Home! {this.state.name}
      </div>
    );
  }
}
