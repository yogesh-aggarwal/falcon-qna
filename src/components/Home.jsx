import React, { Component } from "react";
import { Container, LinearProgress, Typography } from "@material-ui/core";
import QuestionCard from "./QuestionCard";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";

class HomeComponent extends Component {
  // state = { loading: true };
  state = { loading: false };
  questions = [];
  questionIds = [
    "5ea67c62ac5e620ff4057f2f",
    "5ea67c71ac5e620ff4057f31",
    "5ea67c73ac5e620ff4057f32",
  ];

  getQuestionQuery(id) {
    return gql`
      query {
        getQuestion(args: { _id: "${id}" }) {
          _id
          title
          body
          tags
          views
          answers {
            _id
          }
          votes
          postedOn
        }
      }
    `;
  }

  buildQuestionCard(data) {
    return (
      <Container size="sm">
        <QuestionCard quesData={{ routeButton: true, ...data }} />
      </Container>
    );
  }

  renderQuestions() {
    return this.questionIds.map((id) => {
      return (
        <Query query={this.getQuestionQuery(id)}>
          {({ loading, err, data }) => {
            if (data) {
              data = data["getQuestion"];
              return this.buildQuestionCard(data);
            } else if (loading || !data) {
              return <Typography></Typography>;
            } else if (err) {
              return <Typography variant="h6">Error</Typography>;
            }
          }}
        </Query>
      );
    });
    // {/* Setting loading to false */}
    // this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        {/* Progress indicator */}
        {this.state.loading && <LinearProgress color="secondary" />}
        {/* Questions */}
        {this.renderQuestions()}
      </div>
    );
  }
}

export default HomeComponent;
