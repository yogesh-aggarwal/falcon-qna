/// Styles
import "./Styles.scss";

/// Imports
import React from "react";
import {
  GlobalStateInterface,
  TagInterface,
} from "../../services/state/interfaces";
import { HomeQuestionCard } from "../../components/QuestionCard/Home/Card";
import { State } from "../../services/state/state";
import { Chip } from "@material-ui/core";

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
          {(() => {
            if (this.state.tags) {
              return this.state.tags.map((tag: TagInterface) => {
                return (
                  <Chip
                    className="tag"
                    label={tag.name}
                    key={tag.name}
                    clickable
                    style={{ borderColor: tag.color }}
                    color="primary"
                    variant="default"
                  />
                );
              });
            } else {
              return <div></div>;
            }
          })()}
        </div>
      </div>
    );
  }
}
