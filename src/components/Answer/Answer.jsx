import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { Typography, LinearProgress } from "@material-ui/core";

class AnswerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.ANSWER_QUERY = gql`
        query {
            getAnswer(args: { _id: "${this.props.id}" }) {
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
        Error occured while retrieving the answer
      </Typography>
    );
  }

  answer() {
    return <Typography variant="h6">Answer Data is here!</Typography>;
  }

  render() {
    return (
      <Query query={this.ANSWER_QUERY}>
        {({ loading, err, data }) => {
          if (loading) return this.loadingComponent();
          if (err || data == undefined) return this.errorComponent();
          return this.answer();
        }}
      </Query>
    );
  }
}

export default AnswerComponent;
