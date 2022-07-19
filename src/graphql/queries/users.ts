import {gql} from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($limit: Int, $skip: Int) {
    getUsers(limit: $limit, skip: $skip) {
      users {
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
      count
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      active
      email
      image
      role {
        id
        name
      }
    }
  }
`;
