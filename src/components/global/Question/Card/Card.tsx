import React from "react";
import {
  StateInterface,
  QuestionInterface,
} from "../../../../data/interfaces/data";
import { State } from "../../../../data/state";
import { UserState } from "../../../../data/userState";

interface PropsInterface {
  id: string;
}

export class QuestionCard extends React.Component<PropsInterface> {
  id: string;
  state: QuestionInterface = {};

  constructor(props: PropsInterface) {
    super(props);
    this.id = props.id;
  }

  componentDidMount() {
    State.state.subscribe((state: StateInterface) => {
      if (state.questions) {
        console.log(state.questions[this.id]);
        this.setState(state.questions[this.id]);
      }
    });
  }

  render() {
    return (
      <div className="QuestionCardContainer">
        <div
          onClick={() => {
            State.setState({ questions: { abcd: { title: "Yogesh" } } });
            console.log(State.state.value);
          }}
        >
          {this.state.title}
        </div>
      </div>
    );
  }
}
