/// Styles
import "./Styles.scss";

import React from "react";
import {
  QuestionInterface,
  GlobalStateInterface,
} from "../../services/state/interfaces";
import { State } from "../../services/state/state";
import { RouteComponentProps, Link } from "react-router-dom";
import { QuestionCard } from "../../components/QuestionCard/QuestionPage/Card";
import { AnswerCard } from "../../components/AnswerCard/Component";
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

          <div className="Answers">
            <AnswerCard
              answer={{
                body: "Body",
                id: "id",
                votes: { downVoters: ["dfs"], total: -1, upVoters: [] },
              }}
            />
          </div>
        </div>
        <div className="Sidebar">
          <div className="Title">Related Questions</div>
        </div>
      </div>
    );
  }
}
