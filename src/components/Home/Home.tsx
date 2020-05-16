import React, { useContext } from "react";
import { QuestionContext } from "../../contexts/QuestionContext";
import { useQuery } from "@apollo/react-hooks";
import { ALL_QUESTIONS_QUERY } from "./queries";
import { LinearProgress, Typography, Container } from "@material-ui/core";
import QuestionCard from "../Question/QuestionCard";

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

let assigned: boolean = false;

function assignQuestions(questions: Array<any>, setQuestions: Function) {
  let questionsObj: Object = {};
  questions.forEach((question) => {
    questionsObj[question._id] = question;
  });
  if (!assigned) {
    setQuestions(questionsObj);
    assigned = true;
  }
}

function Home(props: any) {
  const { setQuestions } = useContext(QuestionContext) as any;
  const { loading, error, data } = useQuery(ALL_QUESTIONS_QUERY);

  if (loading) return <Loading />;
  else if (error) return <Error />;
  else if (data) {
    assignQuestions(data["getAllQuestions"], setQuestions);
    return (
      <Container>
        {Object.values(data["getAllQuestions"]).map((question: any) => {
          return <QuestionCard qid={question._id} questionPage={false} />;
        })}
      </Container>
    );
  }
  return <div></div>;
}

export default Home;
