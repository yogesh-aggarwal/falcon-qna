import { gql } from "apollo-boost";

export function getQuestionQuery(id) {
  return gql`
      query {
        getQuestion(args: { _id: "${id}" }) {
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
}

export function getUserAnswerableQuery(uid, qid) {
  return gql`
    query {
      checkUserAnswerable(
        args: { uid: "${uid}", questionId: "${qid}" }
      )
    }
  `;
}

export function getSubmitAnswerMutate(body, uid, qid) {
  return gql`
    mutation {
      createAnswer(
        args: {
          body: "${body}"
          owner: "${uid}"
          question: "${qid}"
        }
      )
    }
  `;
}
