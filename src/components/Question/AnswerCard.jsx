import React, { Component } from "react";
import {
  Card,
  Button,
  IconButton,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import {
  StarBorder,
  ThumbUpAlt,
  ThumbUpAltOutlined,
  ThumbDownAlt,
  ThumbDownAltOutlined,
} from "@material-ui/icons";
import * as tools from "../../tools";
import { gql } from "apollo-boost";

class AnswerCard extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.ansData;
  }

  incrementVotes() {
    tools.client.mutate({
      mutation: gql`
        mutation {
          voteAnswer(args: {
            uid: "${tools.currentUser._id}",
            answerId: "${this.state._id}",
            score: 1
          })
        }
      `,
    });
    let increment = 1;
    if (this.state.votes.downvoters.includes(tools.currentUser._id))
      increment = 2;
    this.state.votes.upvoters.push(tools.currentUser._id);
    this.state.votes.downvoters.splice(tools.currentUser._id, 1);
    this.setState({
      votes: {
        net: this.state.votes.net + increment,
        upvoters: this.state.votes.upvoters,
        downvoters: this.state.votes.downvoters,
      },
    });
  }

  decrementVotes() {
    tools.client.mutate({
      mutation: gql`
        mutation {
          voteAnswer(args: {
            uid: "${tools.currentUser._id}",
            answerId: "${this.state._id}",
            score: -1
          })
        }
      `,
    });
    let decrement = -1;
    if (this.state.votes.upvoters.includes(tools.currentUser._id))
      decrement = -2;
    this.state.votes.downvoters.push(tools.currentUser._id);
    this.state.votes.upvoters.splice(tools.currentUser._id, 1);
    this.setState({
      votes: {
        net: this.state.votes.net + decrement,
        upvoters: this.state.votes.upvoters,
        downvoters: this.state.votes.downvoters,
      },
    });
  }

  iconChoiceByVar(variable, icon1, icon2) {
    return variable ? icon1 : icon2;
  }

  getVotesCount() {
    return <Typography>{this.state.votes.net} votes</Typography>;
  }

  getCardHeaderContent() {
    return <CardContent>{this.getCardBody()}</CardContent>;
  }

  getFooterButtons() {
    //? Component is used from home
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* //& Upvote */}
        {tools.AttachTooltip(
          "Question should be promoted",
          <IconButton
            onClick={() => {
              this.incrementVotes();
            }}
            disabled={this.state.votes.upvoters.includes(tools.currentUser._id)}
          >
            {this.iconChoiceByVar(
              this.state.votes.upvoters.includes(tools.currentUser._id),
              <ThumbUpAlt />,
              <ThumbUpAltOutlined />
            )}
          </IconButton>
        )}
        {/* //& Total Votes */}
        {tools.AttachTooltip("Total votes", this.getVotesCount(false))}
        {tools.AttachTooltip(
          "Question should not be promoted",
          <IconButton
            onClick={() => {
              this.decrementVotes();
            }}
            disabled={this.state.votes.downvoters.includes(
              tools.currentUser._id
            )}
          >
            {this.iconChoiceByVar(
              this.state.votes.downvoters.includes(tools.currentUser._id),
              <ThumbDownAlt />,
              <ThumbDownAltOutlined />
            )}
          </IconButton>
        )}
      </div>
    );
  }

  getFooterPrimaryActions() {
    return (
      <div
        className="button"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/*//& Button */}
        {this.getFooterButtons()}
        {/*//& Votes count */}
        {this.state.routeButton && this.getVotesCount()}
      </div>
    );
  }

  getFooterSecondaryActions() {
    return (
      <div
        className="secondary-actions"
        style={{ display: "flex", alignItems: "center" }}
      >
        {/* //& Action buttons */}
        <Button color="primary">Edit</Button>
        <Button color="primary">Follow</Button>
        <Button color="primary">Report</Button>

        {/* //& Answer information */}
        <Typography style={{ marginLeft: "1rem" }}>
          Answered {tools.getTimeAgo(Date.now() - this.state.postedOn)} ago
        </Typography>
        <IconButton color="primary">
          <StarBorder />
        </IconButton>
      </div>
    );
  }

  getCardBody() {
    if (this.state.routeButton) {
      return (
        <Typography variant="body2">
          {this.state.body.slice(0, 300)}...
        </Typography>
      );
    } else {
      return <Typography variant="body1">{this.state.body}</Typography>;
    }
  }

  getCardFooterContent() {
    return (
      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {/* Primary actions */}
        {this.getFooterPrimaryActions()}
        {/* Secondary actions */}
        {this.getFooterSecondaryActions()}
      </CardActions>
    );
  }

  render() {
    return (
      <Card
        variant="outlined"
        key="b781b96f95825813d885c824"
        style={{ marginTop: "1rem" }}
      >
        {/* Header */}
        {this.getCardHeaderContent()}
        {/* Footer */}
        {this.getCardFooterContent()}
      </Card>
    );
  }
}

export default AnswerCard;
