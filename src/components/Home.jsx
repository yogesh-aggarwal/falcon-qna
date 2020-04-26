import React, { Component } from "react";
import { Container } from "@material-ui/core";
import QuestionCard from "./HomeQuestionCard";

class HomeComponent extends Component {
  state = {};
  render() {
    return (
      <div>
        <Container maxWidth="md">
          <QuestionCard
            quesData={{
              title: "Question 1",
              body: "Body of Question 1 in 300 words.",
              tags: ["Angular 9", "AOT"],
              postedOn: 1587873920268,
            }}
          />
          <QuestionCard
            quesData={{
              title: "Question 2",
              body: "Body of Question 2 in 300 words.",
              tags: ["Python"],
              postedOn: 1587873920268,
            }}
          />
          <QuestionCard
            quesData={{
              title: "Question 3",
              body: "Body of Question 3 in 300 words.",
              tags: ["SuperUser"],
              postedOn: 1587873920268,
            }}
          />
        </Container>
      </div>
    );
  }
}

export default HomeComponent;
