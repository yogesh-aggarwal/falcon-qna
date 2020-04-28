import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Chip,
  Typography,
  LinearProgress,
  Container,
} from "@material-ui/core";

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

  fetchQuestion() {}

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

  getQuestionTags() {
    return <Chip label="Hello" />;
  }

  getQuestionCardHeader(data) {
    return (
      <div>
        <div className="tags">{this.getQuestionTags()}</div>
        <div className="body" style={{ marginTop: "1rem" }}>
          <Typography variant="h5">{data.title}</Typography>
          <Typography variant="body2">{data.body}</Typography>
        </div>
      </div>
    );
  }

  getQuestionCardFooter(data) {}

  getQuestion(data) {
    return (
      <Card variant="outlined">
        <CardContent>{this.getQuestionCardHeader(data)}</CardContent>
        <CardActions>{this.getQuestionCardFooter(data)}</CardActions>
      </Card>
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
              <Typography variant="h6" style={{marginTop: "2rem"}}>
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
