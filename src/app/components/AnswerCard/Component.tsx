import React from "react";
import { AnswerInterface } from "../../services/state/interfaces";
import "./Styles.scss";

interface Props {
  answer: AnswerInterface;
}

export class AnswerCard extends React.Component<Props> {
  state: AnswerInterface = {};

  constructor(props: Props) {
    super(props);
    this.state = props.answer;
  }

  render() {
    return (
      <div className="AnswerCard">
        <div className="body">{this.state.body}</div>
      </div>
    );
  }
}
