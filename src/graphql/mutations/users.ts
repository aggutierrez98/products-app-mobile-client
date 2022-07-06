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
