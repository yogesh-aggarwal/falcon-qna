import React from "react";
import {
  GlobalStateInterface,
  QuestionInterface,
} from "../../../../data/interfaces/data";
import { State } from "../../../../data/state";
import {
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  ThumbUpAlt,
  ThumbDownAlt,
} from "@material-ui/icons";

/// Styles
import "../Card.scss";
import { IconButton } from "@material-ui/core";
import { UserInterface } from "../../../../data/interfaces/user";
import { UserState } from "../../../../data/userState";

interface PropsInterface {
  id: string;
}

interface StateInterface {
  question?: QuestionInterface;
  userId?: string;
}

export class QuestionCard extends React.Component<
  PropsInterface,
  StateInterface
> {
  id: string;
  state: StateInterface = {};
  user: UserInterface = {};

  constructor(props: PropsInterface) {
    super(props);
    this.id = props.id;
  }

  componentDidMount() {
    State.state.subscribe((state: GlobalStateInterface) => {
      if (state.questions) {
        this.setState({
          question: state.questions[this.id],
        });
      }
    });
    UserState.state.subscribe((user: UserInterface) => {
      if (user.id) {
        this.setState({
          userId: user.id,
        });
      }
    });
  }

  checkVote(votes: Array<string> | undefined) {
    if (this.state.userId) {
      if (votes?.includes(this.state.userId)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getIsUserUpVoter(): boolean {
    return this.checkVote(this.state.question?.votes?.upVoters);
  }

  getIsUserDownVoter(): boolean {
    return this.checkVote(this.state.question?.votes?.downVoters);
  }

  render() {
    console.log(this.state);
    return (
      <div className="QuestionCardContainer">
        <div className="title">{this.state.question?.title}</div>
        <div className="contentQuestionPage">
          {this.state.question?.content}
        </div>

        <div className="actionsQuestionPage">
          <div className="votes">
            <div className="item">
              {this.getIsUserUpVoter() ? (
                <IconButton>
                  <ThumbUpAlt />
                </IconButton>
              ) : (
                <IconButton>
                  <ThumbUpAltOutlined />
                </IconButton>
              )}
            </div>
            <div className="item">{this.state.question?.votes?.total}</div>
            <div className="item">
              {this.getIsUserDownVoter() ? (
                <IconButton>
                  <ThumbDownAlt />
                </IconButton>
              ) : (
                <IconButton>
                  <ThumbDownAltOutlined />
                </IconButton>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
