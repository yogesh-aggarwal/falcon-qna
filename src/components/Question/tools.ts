import * as tools from "../../tools";
import { gql } from "apollo-boost";

export class Vote {
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
