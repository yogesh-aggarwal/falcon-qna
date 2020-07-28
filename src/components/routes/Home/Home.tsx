import React from "react";
import { StateInterface } from "../../../data/interfaces/data";
import { QuestionCard } from "../../global/Question/Card/Card";
import { State } from "../../../data/state";

/// Styles
import "./Home.scss";

export class Home extends React.Component {
  state: StateInterface = {};

  componentDidMount() {
    State.state.subscribe((state: StateInterface) => {
      this.setState(state);
    });
  }

  render() {
    return (
      <div className="HomeComponentContainer">
        <div className="LeftSidebar">Left Sidebar!</div>
        <div className="Cards">
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
        <div className="RightSidebar">Right Sidebar!</div>
      </div>
    );
  }
}
