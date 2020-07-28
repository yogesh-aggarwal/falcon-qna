import React from "react";
import { StateInterface } from "../../../data/interfaces/data";
import { UserState } from "../../../data/userState";
import { QuestionCard } from "../../global/Question/Card/Card";
import { State } from "../../../data/state";

export class Home extends React.Component {
  state: StateInterface = {};

  componentDidMount() {
    State.state.subscribe((state: StateInterface) => {
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
        {(() => {
          if (this.state.questions) {
            return Object.keys(this.state.questions).map((key: string) => {
              return <QuestionCard id={key} key={key} />;
            });
          } else {
            return <div></div>;
          }
        })()}
      </div>
    );
  }
}
