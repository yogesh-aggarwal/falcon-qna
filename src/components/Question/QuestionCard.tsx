import React, { useContext, CSSProperties } from "react";
import { QuestionContext } from "../../contexts/QuestionContext";
import { isObjEmpty } from "../../tools";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Button,
  Chip,
} from "@material-ui/core";
import {
  ThumbUpAlt,
  ThumbUpAltOutlined,
  ThumbDownAlt,
  ThumbDownAltOutlined,
  ThumbsUpDownOutlined,
  Visibility,
  QuestionAnswerOutlined,
} from "@material-ui/icons";
import { QuestionInterface } from "./interfaces";
import { Link } from "react-router-dom";
import { Vote } from "./tools";
import * as tools from "../../tools";

class Styles {
  static card: CSSProperties = {
    marginTop: "1rem",
  };
  static tag: CSSProperties = { marginRight: ".5rem" };
  static title: CSSProperties = { marginTop: "1rem" };
  static footerActions: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  };
  static inilineElements: CSSProperties = {
    display: "flex",
    alignItems: "center",
  };
  static iconSpaceRight: CSSProperties = {
    marginRight: ".7rem",
  };
  static iconSpaceLeft: CSSProperties = {
    marginLeft: ".7rem",
  };
  static info: CSSProperties = {
    ...Styles.inilineElements,
    marginLeft: "1rem",
  };
}

function Tags({ tags }) {
  return tags.map((tag: string) => {
    return (
      <Chip
        key={tag}
        clickable
        size="small"
        variant="outlined"
        label={tag}
        style={Styles.tag}
      />
    );
  });
}

function FooterIconButton({
  tooltip,
  clickHandle,
  Icon,
  IconOutlined,
  voters,
}) {
  return tools.AttachTooltip(
    tooltip,
    <IconButton
      onClick={clickHandle}
      disabled={voters.includes(tools.currentUser._id)}
    >
      {voters.includes(tools.currentUser._id) ? <Icon /> : <IconOutlined />}
    </IconButton>
  );
}

function AnswerButton({ question }) {
  return (
    <Link to={`/questions/${question._id}`} style={{ textDecoration: "none" }}>
      {tools.AttachTooltip(
        "Try to answer",
        <Button color="primary">Let me try</Button>
      )}
    </Link>
  );
}

function Voting({ questionPage, question, setQuestions }) {
  return (
    <div style={Styles.inilineElements}>
      {/* Upvote */}
      {questionPage && (
        <FooterIconButton
          tooltip="Question should be promoted"
          clickHandle={() => {
            Vote.upvote(question, setQuestions);
          }}
          Icon={ThumbUpAlt}
          IconOutlined={ThumbUpAltOutlined}
          voters={question.votes.upvoters}
        />
      )}
      {/* Total Votes */}
      <div style={Styles.info}>
        {!questionPage && (
          <ThumbsUpDownOutlined style={{ ...Styles.iconSpaceRight }} />
        )}
        {tools.AttachTooltip(
          "Total votes",
          <Typography>
            {question.votes.upvoters.length - question.votes.downvoters.length}{" "}
            votes
          </Typography>
        )}
      </div>
      {/* Downvote */}
      {questionPage && (
        <FooterIconButton
          tooltip="Question shouldn't be promoted"
          clickHandle={() => {
            Vote.downvote(question, setQuestions);
          }}
          Icon={ThumbDownAlt}
          IconOutlined={ThumbDownAltOutlined}
          voters={question.votes.downvoters}
        />
      )}
    </div>
  );
}

function ViewsCount({ views }) {
  return (
    <div style={Styles.info}>
      <Visibility color="action" style={Styles.iconSpaceRight} />
      <Typography>{views} Views</Typography>
    </div>
  );
}

function AnswerCount({ answers }) {
  return (
    <div style={Styles.info}>
      <QuestionAnswerOutlined color="action" style={Styles.iconSpaceRight} />
      <Typography>{answers.length} Answers</Typography>
    </div>
  );
}

function QuestionCard({ qid, questionPage }) {
  const { state, setQuestions } = useContext(QuestionContext) as any;

  if (!isObjEmpty(state)) {
    const question: QuestionInterface = state[qid];
    return (
      <Card variant="outlined" key={qid} style={Styles.card}>
        {/* Header */}
        <CardContent>
          <Tags tags={question.tags} />
          <Typography variant="h6" style={Styles.title}>
            {question.title}
          </Typography>
          <Typography variant="body2">
            {question.body?.slice(0, 5e2)}...
          </Typography>
        </CardContent>
        {/* Footer */}
        <CardActions style={Styles.footerActions}>
          {/* Answer Button */}
          {!questionPage && <AnswerButton question={question} />}
          {/* Voting */}
          <Voting
            questionPage={questionPage}
            question={question}
            setQuestions={setQuestions}
          />
          {/* Views */}
          <ViewsCount views={question.views} />
          {/* Answers count */}
          <AnswerCount answers={question.answers} />
        </CardActions>
      </Card>
    );
  } else return <div>Loading...</div>;
}

export default QuestionCard;
