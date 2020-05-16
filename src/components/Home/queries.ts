import { gql } from "apollo-boost";

export const ALL_QUESTIONS_QUERY = gql`
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
				upvoters
				downvoters
      }
      postedOn
    }
  }
`;
