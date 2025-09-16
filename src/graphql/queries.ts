import { gql } from "@apollo/client";

export const GET_USER_REPOS = gql`
  query ($username: String!) {
    user(login: $username) {
      repositories(
        first: 99
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        nodes {
          name
          url
          createdAt
          updatedAt
          stargazerCount
          stargazers(first: 5) {
            nodes {
              login
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
`;
