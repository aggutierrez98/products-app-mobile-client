import {gql} from '@apollo/client';

export const REGISTER = gql`
  mutation CreateUser($user: AddUserInput!) {
    createUser(user: $user) {
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
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
  }
`;
