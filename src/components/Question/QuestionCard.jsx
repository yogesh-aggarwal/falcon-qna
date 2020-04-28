import React, { Component, useContext } from "react";
import {
  Card,
  Button,
  IconButton,
  CardContent,
  Chip,
  Typography,
  CardActions,
} from "@material-ui/core";
import {
  StarBorder,
  Visibility,
  QuestionAnswerOutlined,
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  ThumbsUpDownOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import * as tools from "../../tools";

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.quesData;
  }

  incrementVotes() {
    this.setState({ votes: this.state.votes + 1 });
  }

  decrementVotes() {
    this.setState({ votes: this.state.votes - 1 });
  }

  getViewsCount() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "1.5rem",
        }}
      >
        <Visibility color="action" style={{ marginRight: ".5rem" }} />
        <Typography>{this.state.views} Views</Typography>
      </div>
    );
  }

  getAnswerCount() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "1.5rem",
        }}
      >
        <QuestionAnswerOutlined
          color="action"
          style={{ marginRight: ".5rem" }}
        />
        <Typography>{this.state.answers.length} Answers</Typography>
      </div>
    );
  }

  getVotesCount(icon = true) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon && (
          <ThumbsUpDownOutlined
            color="action"
            style={{ marginRight: ".5rem", marginLeft: "1.5rem" }}
          />
        )}
        <Typography>{this.state.votes} votes</Typography>
      </div>
    );
  }

  getButtons() {
    //? Component is used from home
    if (this.state.routeButton) {
      return (
        <Link
          to={`/question/${this.state._id}`}
          style={{ textDecoration: "none" }}
        >
          <Button color="primary">Let me try</Button>
        </Link>
      );
    } else {
      //? Component is used from question page, voting buttons should be shown
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
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
      <div
        className="secondary-actions"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Typography>
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
