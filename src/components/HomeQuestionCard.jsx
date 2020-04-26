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
} from "@material-ui/icons";

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
    } else if (seconds > 60) {
      return `${Math.floor(seconds / 60)} min`;
    } else if (seconds >= 3600) {
      return `${Math.floor(seconds / 60 / 60)} hr`;
    }
  }

  render() {
    return (
      <Card variant="outlined" style={{ marginTop: "1rem" }}>
        <CardContent>
          <div className="tags">
            {this.data.tags.map((tag) => {
              return (
                <Chip
                  clickable
                  size="small"
                  variant="outlined"
                  label={tag}
                  style={{ marginRight: ".5rem" }}
                />
              );
            })}
          </div>
          <div className="body" style={{ marginTop: "1rem" }}>
            <Typography variant="h6">{this.data.title}</Typography>
            <Typography variant="body2">{this.data.body}</Typography>
          </div>
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/* Primary actions */}
          <div
            className="button"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button color="primary">Take a look</Button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "1.5rem",
              }}
            >
              <Visibility color="action" style={{ marginRight: ".5rem" }} />
              <Typography>2 Views</Typography>
            </div>
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
              <Typography>2 Answers</Typography>
            </div>
          </div>
          {/* Secondary actions */}
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
        </CardActions>
      </Card>
    );
  }
}

export default QuestionCard;
