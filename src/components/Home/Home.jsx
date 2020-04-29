import React, { Component } from "react";
import {
  Button,
  Box,
  Container,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import QuestionCard from "../Question/QuestionCard";
import { Link } from "react-router-dom";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";

class HomeComponent extends Component {
  state = { loading: false };
  constructor() {
    super();
    this.questionsQuery = gql`
      query {
        getAllQuestions {
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
    return (
      <Query query={this.questionsQuery}>
        {({ loading, err, data }) => {
          if (data) {
            console.log(data);
            data = data["getAllQuestions"];
            return data.reverse().map((question) => {
              return this.buildQuestionCard(question);
            });
          } else if (loading || !data) {
            return <Typography></Typography>;
          } else if (err) {
            return <Typography variant="h6">Error</Typography>;
          }
        }}
      </Query>
    );
  }

  render() {
    return (
      <div>
        {/* Progress indicator */}
        {this.state.loading && <LinearProgress color="secondary" />}
        <Container
          size="sm"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <Typography variant="h5">
            <Box fontWeight={600}>QUESTIONS ON RISE</Box>
          </Typography>
          <Link to="/question" style={{ textDecoration: "none" }}>
            <Button color="secondary" variant="contained">
              I have question
            </Button>
          </Link>
        </Container>
        {/* Questions */}
        {this.renderQuestions()}
      </div>
    );
  }
}

export default HomeComponent;
