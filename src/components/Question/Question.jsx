import React, { useState } from "react";
import { useQuery } from "react-apollo";
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

import {
  getQuestionQuery,
  getUserAnswerableQuery,
  getSubmitAnswerMutate,
} from "./Queries";

function Loading() {
  return <LinearProgress color="secondary" />;
}

function Error() {
  return (
    <Typography variant="h6">
      Error occured while retrieving the question
    </Typography>
  );
}

function submitAnswer(props) {
  tools.client
    .mutate({
      mutation: getSubmitAnswerMutate(props.state.body, props.uid, props.qid),
    })
    .then(({ error, data }) => {
      if (error) props.setState({ showQuestionSubmitedSnackbar: true });
      else if (data) {
        props.setState({ showQuestionSubmitingSnackbar: false });
        props.setState({ showQuestionSubmitedSnackbar: false });
      }
    })
    .catch(() => {
      props.setState({ showQuestionSubmitingSnackbar: false });
      props.setState({ showQuestionErrorSnackbar: true });
    });
}

function QuestionComponent(props) {
  let { loading, error, data } = useQuery(
    getQuestionQuery(props.match.params.id)
  );
  let [state] = useState({});

  if (loading) return <Loading />;
  if (error || data === undefined) return <Error />;

  data = data["getQuestion"];
  return (
    <Container size="sm">
      {/* Question Card */}
      <QuestionCard key={data._id} quesData={data} />
      <AnswerForm
        state={state}
        qid={props.match.params.id}
        uid={tools.currentUser._id}
      />
      <Divider variant="fullWidth" style={{ marginBottom: "2.5rem" }} />

      {/* Answers Cards */}
      <Typography variant="h6">
        <Box fontWeight={800}>{data.answers.length} Answers</Box>
      </Typography>

      {data.answers.map((answer) => {
        return (
          <AnswerCard
            key={answer._id}
            ansData={{
              ...answer,
              questionId: props.match.params.id,
            }}
          />
        );
      })}
    </Container>
  );
}

function AnswerForm(props) {
  let { loading, error, data } = useQuery(
    getUserAnswerableQuery(tools.currentUser._id, props.qid)
  );

  if (loading) return "Loading answer form...";
  if (error) return "Error while loading answer form!";

  if (data["checkUserAnswerable"])
    return (
      <Card variant="outlined" color="red" style={{ marginTop: "2rem" }}>
        <CardContent>
          <Typography variant="h6">
            <Box fontWeight={800}>My answer</Box>
          </Typography>

          <TextField
            error={props.state.answerError}
            id="outlined-multiline-flexible"
            label="Describe your answer in detail"
            multiline
            variant="outlined"
            fullWidth
            autoCapitalize
            autoCorrect
            onChange={(e) => {
              if (e.target.value) {
                props.setState({ answerError: false });
              } else {
                props.setState({ answerError: true });
              }
              props.setState({ answerBody: e.target.value });
            }}
            onBlur={(e) => {
              e.target.value.replace(" ", "")
                ? props.setState({ answerError: false })
                : props.setState({ answerError: true });
            }}
            style={{ marginTop: "1.5rem" }}
          />
        </CardContent>
        <CardActions style={{ marginLeft: ".5rem", marginBottom: ".5rem" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              if (!props.state.answerError && props.state.answerBody)
                submitAnswer({
                  body: props.body,
                  qid: props.qid,
                  uid: props.uid,
                });
              else {
                props.setState({ answerError: true });
              }
            }}
          >
            Answer
          </Button>
        </CardActions>
      </Card>
    );
  else return "User isn't answerable!!!";
}
export default QuestionComponent;
