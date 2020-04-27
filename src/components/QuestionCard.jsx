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
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  ThumbsUpDownOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

class Widgets {
  constructor(data) {
    this.data = data;
    console.log(this.data);
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
        <Typography>{this.data.views} Views</Typography>
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
        <Typography>{this.data.answers.length} Answers</Typography>
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
        <Typography>{this.data.votes} votes</Typography>
      </div>
    );
  }

  getButtons() {
    //? Component is used from home
    if (this.data.routeButton) {
      return (
        <Link
          to={`/question/${this.data._id}`}
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
          <IconButton>
            <ThumbUpAltOutlined />
          </IconButton>
          {this.getVotesCount(false)}
          <IconButton>
            <ThumbDownAltOutlined />
          </IconButton>
        </div>
      );
    }
  }

  getCardBody() {
    if (this.data.routeButton) {
      return (
        <Typography variant="body2">
          {this.data.body.slice(0, 300)}...
        </Typography>
      );
    } else {
      return <Typography variant="body2">{this.data.body}</Typography>;
    }
  }
}

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.data = this.props.quesData;
    console.log(this.data);
    this.widgets = new Widgets(this.data);
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
          {this.widgets.getCardBody()}
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
        {this.widgets.getButtons()}
        {/*//& Views count */}
        {this.widgets.getViewsCount()}
        {/*//& Answers count */}
        {this.widgets.getAnswerCount()}
        {/*//& Votes count */}
        {this.data.routeButton && this.widgets.getVotesCount()}
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
