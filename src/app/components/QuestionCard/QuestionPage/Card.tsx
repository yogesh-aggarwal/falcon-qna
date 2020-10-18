import React from "react";
import {
  GlobalStateInterface,
  QuestionInterface,
  UserInterface,
} from "../../../services/state/interfaces";
import { State } from "../../../services/state/state";
import {
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  ThumbUpAlt,
  ThumbDownAlt,
} from "@material-ui/icons";

/// Styles
import "../Card.scss";
import { IconButton } from "@material-ui/core";
import { UserState } from "../../../services/state/userState";

interface PropsInterface {
  id: string;
}

interface StateInterface {
  question?: QuestionInterface;
  userId?: string;
  isUserSuspended?: boolean;
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
          isUserSuspended: user.isSuspended,
        });
      }
    });
  }

  private checkVote(votes: Array<string> | undefined) {
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

  private updateVotes(upVoters: Array<string>, downVoters: Array<string>) {
    let questionUpdate: any = {};
    questionUpdate[this.id] = {
      votes: {
        upVoters: upVoters,
        downVoters: downVoters,
        total: upVoters.length - downVoters.length,
      },
    };

    State.setState({ questions: questionUpdate });
  }

  toggleUpVote() {
    let { upVoters, downVoters } = this.state.question?.votes as any;

    const upVoterUserIndex: number = upVoters.indexOf(this.state.userId);
    const downVoterUserIndex: number = downVoters.indexOf(this.state.userId);

    if (downVoterUserIndex >= 0) {
      downVoters.splice(downVoterUserIndex, 1);
    }
    if (upVoterUserIndex >= 0) {
      upVoters.splice(upVoterUserIndex, 1);
    } else {
      upVoters.push(this.state.userId);
    }

    this.updateVotes(upVoters, downVoters);
  }

  toggleDownVote() {
    let { upVoters, downVoters } = this.state.question?.votes as any;

    const upVoterUserIndex: number = upVoters.indexOf(this.state.userId);
    const downVoterUserIndex: number = downVoters.indexOf(this.state.userId);

    if (upVoterUserIndex >= 0) {
      upVoters.splice(upVoterUserIndex, 1);
    }
    if (downVoterUserIndex >= 0) {
      downVoters.splice(downVoterUserIndex, 1);
    } else {
      downVoters.push(this.state.userId);
    }

    this.updateVotes(upVoters, downVoters);
  }

  render() {
    return (
      <div className="QuestionCardContainer">
        <div className="title">{this.state.question?.title}</div>
        <div className="contentQuestionPage">
          {this.state.question?.content}
        </div>

        <div className="actionsQuestionPage">
          <div className="votes">
            <div className="item">
              <IconButton
                disabled={this.state.isUserSuspended}
                onClick={() => {
                  this.toggleUpVote();
                }}
              >
                {this.getIsUserUpVoter() ? (
                  <ThumbUpAlt />
                ) : (
                  <ThumbUpAltOutlined />
                )}
              </IconButton>
            </div>
            <div className="count">{this.state.question?.votes?.total}</div>
            <div className="item">
              <IconButton
                disabled={this.state.isUserSuspended}
                onClick={() => {
                  this.toggleDownVote();
                }}
              >
                {this.getIsUserDownVoter() ? (
                  <ThumbDownAlt />
                ) : (
                  <ThumbDownAltOutlined />
                )}
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
