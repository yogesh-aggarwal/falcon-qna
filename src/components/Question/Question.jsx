import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { Box, Container, LinearProgress, Typography } from "@material-ui/core";

import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";

class QuestionComponent extends Component {
  QUESTION_QUERY;

  constructor(props) {
    super(props);
    this.state = {};

    this.QUESTION_QUERY = gql`
      query {
        getQuestion(args: { _id: "${this.props.match.params.id}" }) {
          _id
          title
          body
          tags
          views
          answers {
            _id
            body
            votes
            postedOn
          }
          votes
          postedOn
        }
      }
    `;
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

  render() {
    return (
      <Query query={this.QUESTION_QUERY}>
        {({ loading, err, data }) => {
          if (loading) return this.loadingComponent();
          if (err || data === undefined) return this.errorComponent();
          data = data["getQuestion"];
          return (
            <Container size="sm">
              {/* //& Question Card */}
              <QuestionCard quesData={data} />
              {/* //& Answers Cards */}
              <Typography variant="h6" style={{ marginTop: "2rem" }}>
                <Box fontWeight={800}>{data.answers.length} Answers</Box>
              </Typography>
              {data.answers.map((answer) => {
                return <AnswerCard ansData={answer} />;
              })}
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default QuestionComponent;
