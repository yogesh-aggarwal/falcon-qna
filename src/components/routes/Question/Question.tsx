import React from "react";
import {
  QuestionInterface,
  StateInterface,
} from "../../../data/interfaces/data";
import { State } from "../../../data/state";
import { RouteComponentProps } from "react-router-dom";
import { QuestionCard } from "../../global/QuestionCard/QuestionPage/Card";

interface Props {
  id: string;
}

export class Question extends React.Component<Props> {
  id: string = "";
  state: QuestionInterface = {};

  constructor(props: RouteComponentProps) {
    super(props as any);
    this.id = (props.match.params as any)["id"];
  }

  componentDidMount() {
    State.state.subscribe((state: StateInterface) => {
      if (state.questions) {
        this.setState(state.questions[this.id]);
      }
    });
  }

  render() {
    return (
      <div className="HomeComponentContainer CardsContainer">
        <div className="LeftSidebar">Left Sidebar!</div>
        <div className="Cards">
          <QuestionCard id={this.id} />
        </div>
        <div className="RightSidebar">Right Sidebar!</div>
      </div>
    );
  }
}
