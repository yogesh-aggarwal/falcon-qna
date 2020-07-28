import React from "react";
import {
  QuestionInterface,
  StateInterface,
} from "../../../data/interfaces/data";
import { State } from "../../../data/state";
import { RouteComponentProps } from "react-router-dom";

interface Props {
  id: string;
}

export class Question extends React.Component<Props> {
  id: string = "";
  state: QuestionInterface = {};

  constructor(props: RouteComponentProps) {
    super(props as any);
    console.log(props);
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
    return <div>{this.id}</div>;
  }
}
