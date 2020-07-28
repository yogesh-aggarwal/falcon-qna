import React from "react";
import { GlobalStateInterface } from "../../../data/interfaces/data";
import { HomeQuestionCard } from "../../global/QuestionCard/Home/Card";
import { State } from "../../../data/state";

/// Styles
import "./Home.scss";

export class Home extends React.Component {
  state: GlobalStateInterface = {};

  componentDidMount() {
    State.state.subscribe((state: GlobalStateInterface) => {
      this.setState(state);
    });
  }

  render() {
    return (
      <div className="HomeComponentContainer CardsContainer">
        <div className="LeftSidebar">Left Sidebar!</div>
        <div className="Cards">
          {(() => {
            if (this.state.questions) {
              return Object.keys(this.state.questions).map((key: string) => {
                return <HomeQuestionCard id={key} key={key} />;
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
