import {gql} from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($limit: Int, $skip: Int) {
    getUsers(limit: $limit, skip: $skip) {
      ... on GetUsersResults {
        users {
          id
          name
          email
          image
        }
        count
      }
      ... on InputError {
        error {
          message
        }
      }
    }
  }
`;

// export const GET_USER = gql`
//   query getUser($id: ID!) {
//     getUser(id: $id) {
//       ... on User {
//         id
//         name
//         active
//         email
//       }
//       ... on InputError {
//         error {
//           message
//         }
//       }
//     }
//   }
// `;

export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      active
      email
    }
  }
`;
