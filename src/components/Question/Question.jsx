import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Divider,
  LinearProgress,
  TextField,
  Typography,
} from "@material-ui/core";

import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";
import * as tools from "../../tools";

class QuestionComponent extends Component {
  QUESTION_QUERY;

  constructor(props) {
    super(props);
    this.state = {
      answerBody: "",
      answerError: false,
      answerFocus: false,
    };

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
            votes {
              net
              upvoters
              downvoters
            }
            postedOn
          }
          votes {
            net
            upvoters
            downvoters
          }
          postedOn
        }
      }
    `;
    this.USER_ANSWERALE_QUERY = gql`
      query {
        checkUserAnswerable(
          args: { uid: "${tools.currentUser._id}", questionId: "${this.props.match.params.id}" }
        )
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

  submitAnswer() {
    tools.client
      .mutate({
        mutation: gql`
          mutation {
            createAnswer(
              args: {
                body: "${this.state.answerBody}"
                owner: "${tools.currentUser._id}"
                question: "${this.props.match.params.id}"
              }
            )
          }
        `,
      })
      .then(({ loading, error, data }) => {
        if (error) this.setState({ showQuestionSubmitedSnackbar: true });
        else if (data) {
          this.setState({ showQuestionSubmitingSnackbar: false });
          this.setState({ showQuestionSubmitedSnackbar: false });
        }
      })
      .catch((err) => {
        this.setState({ showQuestionSubmitingSnackbar: false });
        this.setState({ showQuestionErrorSnackbar: true });
      });
  }

  getAnswerForm() {
    return (
      <Query query={this.USER_ANSWERALE_QUERY}>
        {(queryState) => {
          if (queryState.data) {
            if (queryState.data["checkUserAnswerable"]) {
              return (
                <Card
                  variant="outlined"
                  color="red"
                  style={{ marginTop: "2rem" }}
                >
                  <CardContent>
                    <Typography variant="h6">
                      <Box fontWeight={800}>My answer</Box>
                    </Typography>

                    <TextField
                      error={this.state.answerError}
                      id="outlined-multiline-flexible"
                      label="Describe your answer in detail"
                      multiline
                      variant="outlined"
                      fullWidth
                      autoCapitalize
                      autoCorrect
                      onChange={(e) => {
                        if (e.target.value) {
                          this.setState({ answerError: false });
                        } else {
                          this.setState({ answerError: true });
                        }
                        this.setState({ answerBody: e.target.value });
                      }}
                      onBlur={(e) => {
                        e.target.value.replace(" ", "")
                          ? this.setState({ answerError: false })
                          : this.setState({ answerError: true });
                      }}
                      style={{ marginTop: "1.5rem" }}
                    />
                  </CardContent>
                  <CardActions
                    style={{ marginLeft: ".5rem", marginBottom: ".5rem" }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        if (!this.state.answerError && this.state.answerBody)
                          this.submitAnswer();
                        else {
                          this.setState({ answerError: true });
                        }
                      }}
                    >
                      Answer
                    </Button>
                  </CardActions>
                </Card>
              );
            } else {
              return "";
            }
          } else {
            return "";
          }
        }}
      </Query>
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
              <QuestionCard key={data._id} quesData={data} />

              {this.getAnswerForm()}
              <Divider variant="fullWidth" style={{ marginBottom: "2.5rem" }} />

              {/* //& Answers Cards */}
              <Typography variant="h6">
                <Box fontWeight={800}>{data.answers.length} Answers</Box>
              </Typography>

              {data.answers.map((answer) => {
                return (
                  <AnswerCard
                    key={answer._id}
                    ansData={{
                      ...answer,
                      questionId: this.props.match.params.id,
                    }}
                  />
                );
              })}
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default QuestionComponent;
