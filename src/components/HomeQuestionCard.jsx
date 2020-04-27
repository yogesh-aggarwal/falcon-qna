import React, { Component } from "react";
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
  ThumbsUpDownOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.quesData;
    this.state = {};
  }

  getTimeAgo(timestampDiff) {
    let seconds = timestampDiff / 1000;
    if (seconds <= 60) {
      return `${Math.floor(seconds)} sec`;
    } else if (60 < seconds && seconds < 3600) {
      return `${Math.floor(seconds / 60)} min`;
    } else if (seconds >= 3600) {
      return `${Math.floor(seconds / 60 / 60)} hr`;
    }
  }

  getTagChips() {
    return this.data.tags.map((tag) => {
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
          <Typography variant="h6">{this.data.title}</Typography>
          <Typography variant="body2">{this.data.body}</Typography>
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
        <Link
          to={`/question/${this.data._id}`}
          style={{ textDecoration: "none" }}
        >
          <Button color="primary">Let me try</Button>
        </Link>
        {/*//& Views Count */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "1.5rem",
          }}
        >
          <Visibility color="action" style={{ marginRight: ".5rem" }} />
          <Typography>{this.data.views} Views</Typography>
        </div>
        {/*//& Answers count */}
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
          <Typography>{this.data.votes} Answers</Typography>
        </div>
        {/*//& Votes count */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "1.5rem",
          }}
        >
          <ThumbsUpDownOutlined
            color="action"
            style={{ marginRight: ".5rem" }}
          />
          <Typography>{this.data.votes} votes</Typography>
        </div>
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
          Posted {this.getTimeAgo(Date.now() - this.data.postedOn)} ago
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
