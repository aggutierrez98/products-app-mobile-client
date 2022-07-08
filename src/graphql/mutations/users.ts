import {gql} from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      ... on User {
        id
        name
        email
        image
        role {
          id
          name
        }
        active
      }
      ... on InputError {
        error {
          message
        }
      }
    }
  }
`;

export const DEACTIVATE_USER = gql`
  mutation DeactivateUser($id: ID!) {
    deleteUser(id: $id) {
      ... on User {
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
      ... on InputError {
        error {
          message
        }
      }
    }
  }
`;
