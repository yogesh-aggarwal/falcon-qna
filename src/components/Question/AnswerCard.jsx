import React, { useState } from "react";
import {
  Card,
  Button,
  IconButton,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import {
  ThumbUpAlt,
  ThumbUpAltOutlined,
  ThumbDownAlt,
  ThumbDownAltOutlined,
} from "@material-ui/icons";
import * as tools from "../../tools";
import { gql } from "apollo-boost";

let styles = {
  card: { marginTop: "1rem" },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  footer: {
    buttons: { display: "flex", alignItems: "center" },
    actions: { display: "flex", alignItems: "center" },
    ansInfo: { marginLeft: "1rem", marginRight: "1rem" },
  },
};

class Vote {
  static upvote(state, setState) {
    console.log(state, "upvoter");
    tools.client.mutate({
      mutation: gql`
        mutation {
          voteAnswer(args: {
            uid: "${tools.currentUser._id}",
            answerId: "${state._id}",
            score: 1
          })
        }
      `,
    });
    let increment = 1;
    if (state.votes.downvoters.includes(tools.currentUser._id)) increment = 2;
    console.log(state.votes, "upvote");
    state.votes.upvoters.push(tools.currentUser._id);
    state.votes.downvoters.splice(
      state.votes.downvoters.indexOf(tools.currentUser._id),
      1
    );
    console.log(state.votes, "upvote");
    setState({
      votes: {
        net: state.votes.net + increment,
        upvoters: state.votes.upvoters,
        downvoters: state.votes.downvoters,
      },
    });
  }

  static downvote(state, setState) {
    // console.log(state, "downvoter");
    tools.client.mutate({
      mutation: gql`
        mutation {
          voteAnswer(args: {
            uid: "${tools.currentUser._id}",
            answerId: "${state._id}",
            score: -1
          })
        }
      `,
    });
    let decrement = -1;
    if (state.votes.upvoters.includes(tools.currentUser._id)) decrement = -2;
    state.votes.downvoters.push(tools.currentUser._id);
    state.votes.upvoters.splice(
      state.votes.upvoters.indexOf(tools.currentUser._id),
      1
    );
    // console.log(state.votes, "downvote");
    setState({
      votes: {
        net: state.votes.net + decrement,
        upvoters: state.votes.upvoters,
        downvoters: state.votes.downvoters,
      },
    });
  }
}

class Footer {
  static FooterButton({ tooltip, clickHandle, Icon, IconOutlined, voters }) {
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

  static FooterButtons({ state, setState }) {
    //? Component is used from home
    return (
      <div style={styles.footer.buttons}>
        {/* //& Upvote */}
        <Footer.FooterButton
          tooltip="Question should be promoted"
          clickHandle={() => [Vote.upvote(state, setState)]}
          Icon={ThumbUpAlt}
          IconOutlined={ThumbUpAltOutlined}
          voters={state.votes.upvoters}
        />
        {/* //& Total Votes */}
        {tools.AttachTooltip(
          "Total votes",
          <Typography>
            {state.votes.upvoters.length - state.votes.downvoters.length} votes
          </Typography>
        )}
        {/* //& Upvote */}
        <Footer.FooterButton
          tooltip="Question shouldn't be promoted"
          clickHandle={() => [Vote.downvote(state, setState)]}
          Icon={ThumbDownAlt}
          IconOutlined={ThumbDownAltOutlined}
          voters={state.votes.downvoters}
        />
      </div>
    );
  }

  static FooterSecondaryActions({ postedOn }) {
    return (
      <div className="secondary-actions" style={styles.footer.actions}>
        {/* //& Action buttons */}
        <Button color="primary">Edit</Button>
        <Button color="primary">Follow</Button>
        <Button color="primary">Report</Button>

        {/* //& Answer information */}
        <Typography style={styles.footer.ansInfo}>
          Answered {tools.getTimeAgo(Date.now() - postedOn)} ago
        </Typography>
      </div>
    );
  }
}

function CardBody({ state }) {
  return (
    <CardContent>
      <Typography variant="body1">{state.body}</Typography>
    </CardContent>
  );
}

function AnswerCard(props) {
  let _state = useState(props.ansData);
  let state = _state[0];
  let _setState = _state[1];
  function setState(newState) {
    _setState({ ...state, ...newState });
  }
  console.log(state);

  return (
    <Card variant="outlined" key="b781b96f95825813d885c824" style={styles.card}>
      {/* Header */}
      <CardBody state={state} />

      {/* Footer */}
      <CardActions style={styles.cardActions}>
        {/* Primary actions */}
        <Footer.FooterButtons state={state} setState={setState} />
        {/* Secondary actions */}
        <Footer.FooterSecondaryActions postedOn={state.postedOn} />
      </CardActions>
    </Card>
  );
}

export default AnswerCard;
