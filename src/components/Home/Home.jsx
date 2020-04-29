import React, { Component } from "react";
import { Container, LinearProgress, Typography } from "@material-ui/core";
import QuestionCard from "../Question/QuestionCard";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";

class HomeComponent extends Component {
  state = { loading: false };
  questions = [];
  questionIds = [
    "5ea8072f694baa3e5c66a7dd",
    "5ea80740694baa3e5c66a7de",
    "5ea80743694baa3e5c66a7df",
    "5ea80745694baa3e5c66a7e0",
    "5ea80747694baa3e5c66a7e1",
    "5ea80748694baa3e5c66a7e2",
    "5ea80763694baa3e5c66a7e3",
    "5ea80764694baa3e5c66a7e4",
  ];

  getQuestionQuery(id) {
    return gql`
      query {
        getQuestion(args: { _id: "${id}" }) {
          _id
          title
          body
          tags
          answers {
            _id
          }
          views
          votes {
            net
          }
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
