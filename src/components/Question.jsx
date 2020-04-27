import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import {
  //   Card,
  //   CardContent,
  //   CardActions,
  //   Button,
  //   IconButton,
  //   Chip,
  Typography,
  LinearProgress,
} from "@material-ui/core";

class QuestionComponent extends Component {
  QUESTION_QUERY;

  constructor(props) {
    super(props);
    this.state = {};

    this.QUESTION_QUERY = gql`
      query {
          getQuestion(args: { _id: "${this.props.match.params.id}" }) {
          _id
          body
          owner {
              name
              isBanned
          }
      }
    }`;
  }

  loadingComponent() {
    return <LinearProgress color="secondary" />;
  }

  errorComponent() {
    return (
      <Typography variant="h6">
        Error occured while retrieving the question
      </Typography>
    );
  }

  question() {
    return <Typography variant="h6">Question Data is here!</Typography>;
  }

  render() {
    return (
      <Query query={this.QUESTION_QUERY}>
        {({ loading, err, data }) => {
          if (loading) return this.loadingComponent();
          if (err || data === undefined) return this.errorComponent();
          return this.question();
        }}
      </Query>
    );
  }
}

export default QuestionComponent;
