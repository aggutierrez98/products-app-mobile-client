import {gql} from '@apollo/client';

export const REGISTER = gql`
  mutation CreateUser($user: AddUserInput!) {
    createUser(user: $user) {
      ... on AuthResults {
        user {
          id
          name
          email
          image
          role {
            id
            name
          }
          active
          google
        }
        token
      }
      ... on InputError {
        error {
          message
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ... on AuthResults {
        user {
          id
          name
          email
          image
          active
          role {
            id
            name
          }
        }
        token
      }
      ... on InputError {
        error {
          message
        }
      }
    }
  }
`;
