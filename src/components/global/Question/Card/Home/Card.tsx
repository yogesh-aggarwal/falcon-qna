import React from "react";
import {
  StateInterface,
  QuestionInterface,
} from "../../../../../data/interfaces/data";
import { State } from "../../../../../data/state";
import { Button } from "@material-ui/core";
import { ThumbsUpDownOutlined } from "@material-ui/icons";

/// Styles
import "../Card.scss";

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
        this.setState(state.questions[this.id]);
      }
    });
  }

  render() {
    return (
      <div className="QuestionCardContainer">
        <div className="title">{this.state.title}</div>
        <div className="content">{this.state.content}</div>

        <div className="actions">
          <Button color="primary" variant="contained">
            Let me try
          </Button>
          <div className="votes">
            <ThumbsUpDownOutlined />
            <div className="count">{this.state.votes?.total}</div>
          </div>
        </div>
      </div>
    );
  }
}