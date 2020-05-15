import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import { Typography, LinearProgress } from "@material-ui/core";

function loadingComponent() {
  return <LinearProgress color="secondary" />;
}

function AnswerComponent(props) {
  let ANSWER_QUERY = gql`
    query {
        getAnswer(args: { _id: "${props.id}" }) {
        _id
        body
        owner {
            name
            isBanned
        }
      }
    }
  `;
  const [state, setState] = useState();
  const { loading, error, data } = useQuery(ANSWER_QUERY);

  if (loading) return loadingComponent();
  if (error || data === undefined) return errorComponent();
  return answer();
}

function errorComponent() {
  return (
    <Typography variant="h6">
      Error occured while retrieving the answer
    </Typography>
  );
}

function answer() {
  return <Typography variant="h6">Answer Data is here!</Typography>;
}

export default AnswerComponent;
