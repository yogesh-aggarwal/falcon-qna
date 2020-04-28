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
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
} from "@material-ui/icons";
import * as tools from "../../tools";

class AnswerCard extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.ansData;
  }

  incrementVotes() {
    this.setState({ votes: this.state.votes + 1 });
  }

  decrementVotes() {
    this.setState({ votes: this.state.votes - 1 });
  }

  getVotesCount() {
    return <Typography>{this.state.votes} votes</Typography>;
  }

  getCardHeaderContent() {
    return <CardContent>{this.getCardBody()}</CardContent>;
  }

  getFooterButtons() {
    //? Component is used from home
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* //& Voting buttons */}
        <IconButton
          onClick={() => {
            this.incrementVotes();
          }}
        >
          <ThumbUpAltOutlined />
        </IconButton>
        {this.getVotesCount(false)}
        <IconButton
          onClick={() => {
            this.decrementVotes();
          }}
        >
          <ThumbDownAltOutlined />
        </IconButton>

        {/* //& Action buttons */}
        <Button color="primary">Edit</Button>
        <Button color="primary">Follow</Button>
        <Button color="primary">Report</Button>
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
        <Typography>
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
