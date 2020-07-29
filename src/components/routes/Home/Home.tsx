/// Styles
import "./Home.scss";

/// Imports
import React from "react";
import { GlobalStateInterface } from "../../../data/interfaces/data";
import { HomeQuestionCard } from "../../global/QuestionCard/Home/Card";
import { State } from "../../../data/state";
import { Chip, Avatar } from "@material-ui/core";

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
        <div className="Sidebar">
          <Chip
            avatar={<Avatar>M</Avatar>}
            label="Primary clickable"
            clickable
            color="primary"
            variant="outlined"
          />
        </div>
      </div>
    );
  }
}
