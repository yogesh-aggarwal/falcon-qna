/// Styles
import "./Question.scss";

import React from "react";
import {
  QuestionInterface,
  GlobalStateInterface,
} from "../../../data/interfaces/data";
import { State } from "../../../data/state";
import { RouteComponentProps, Link } from "react-router-dom";
import { QuestionCard } from "../../global/QuestionCard/QuestionPage/Card";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

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
    State.state.subscribe((state: GlobalStateInterface) => {
      if (state.questions) {
        this.setState(state.questions[this.id]);
      }
    });
  }

  render() {
    return (
      <div className="QuestionComponentContainer CardsContainer">
        <div className="Cards">
          <div className="BackIcon">
            <Link to="/">
              <IconButton>
                <ArrowBack />
              </IconButton>
            </Link>
          </div>
          <QuestionCard id={this.id} />
        </div>
        <div className="Sidebar">Right Sidebar!</div>
      </div>
    );
  }
}
