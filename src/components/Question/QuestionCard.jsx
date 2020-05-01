import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import {
  StarBorder,
  Visibility,
  QuestionAnswerOutlined,
  ThumbUpAlt,
  ThumbUpAltOutlined,
  ThumbDownAlt,
  ThumbDownAltOutlined,
  ThumbsUpDownOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import * as tools from "../../tools";
import { gql } from "apollo-boost";

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.quesData;
  }

  incrementVotes() {
    tools.client.mutate({
      mutation: gql`
        mutation {
          voteQuestion(args: {
            uid: "${tools.currentUser._id}",
            questionId: "${this.state._id}",
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
          voteQuestion(args: {
            uid: "${tools.currentUser._id}",
            questionId: "${this.state._id}",
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

  getViewsCount() {
    return (
      <div style={tools.styles.inlineItems}>
        <Visibility
          color="action"
          style={{ marginRight: ".5rem", marginLeft: "1.5rem" }}
        />
        <Typography>{this.state.views} Views</Typography>
      </div>
    );
  }

  getAnswerCount() {
    return (
      <div style={tools.styles.inlineItems}>
        <QuestionAnswerOutlined
          color="action"
          style={{ marginRight: ".5rem", marginLeft: "1.5rem" }}
        />
        <Typography>{this.state.answers.length} Answers</Typography>
      </div>
    );
  }

  getVotesCount(icon = true) {
    return (
      <div style={tools.styles.inlineItems}>
        {icon && (
          <ThumbsUpDownOutlined
            color="action"
            style={{ marginRight: ".5rem", marginLeft: "1.5rem" }}
          />
        )}
        <Typography>{this.state.votes.net} votes</Typography>
      </div>
    );
  }

  getButtons() {
    //? Component is used from home
    if (this.state.routeButton) {
      return (
        <Link
          to={`/questions/${this.state._id}`}
          style={{ textDecoration: "none" }}
        >
          {tools.AttachTooltip(
            "Try to answer",
            <Button color="primary">Let me try</Button>
          )}
        </Link>
      );
    } else {
      //? Component is used from question page, voting buttons should be shown
      return (
        <div style={tools.styles.inlineItems}>
          {/* //& Upvote */}
          {tools.AttachTooltip(
            "Question should be promoted",
            <IconButton
              onClick={() => {
                this.incrementVotes();
              }}
              disabled={this.state.votes.upvoters.includes(
                tools.currentUser._id
              )}
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
          {/* //& Downvote */}
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
  }

  getCardBody() {
    if (this.state.routeButton) {
      return (
        <Typography variant="body2">
          {this.state.body.slice(0, 300)}...
        </Typography>
      );
    } else {
      return <Typography variant="body2">{this.state.body}</Typography>;
    }
  }

  getTagChips() {
    return this.state.tags.map((tag) => {
      return (
        <Chip
          key={tag}
          clickable
          size="small"
          variant="outlined"
          label={tag}
          style={{ marginRight: ".5rem" }}
        />
      );
    });
  }

  getCardHeaderContent() {
    return (
      <CardContent>
        <div className="tags">{this.getTagChips()}</div>
        <div className="body" style={{ marginTop: "1rem" }}>
          <Typography variant="h6">{this.state.title}</Typography>
          {this.getCardBody()}
        </div>
      </CardContent>
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
        {this.getButtons()}
        {/*//& Views count */}
        {this.getViewsCount()}
        {/*//& Answers count */}
        {this.getAnswerCount()}
        {/*//& Votes count */}
        {this.state.routeButton && this.getVotesCount()}
      </div>
    );
  }

  getFooterSecondaryActions() {
    return (
      <div className="secondary-actions" style={tools.styles.inlineItems}>
        <Button color="primary">Follow</Button>
        {/* {() => {
          if (!this.state.routeButton) {
            return <Button color="primary">Edit</Button>;
          } else {
            return <Button color="primary">Report</Button>;
          }
        }} */}
        <Typography style={{ marginLeft: "1rem" }}>
          Posted {tools.getTimeAgo(Date.now() - this.state.postedOn)} ago
        </Typography>
        <IconButton color="primary">
          <StarBorder />
        </IconButton>
      </div>
    );
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

export default QuestionCard;
