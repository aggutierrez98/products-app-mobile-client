import {gql} from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
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
  }
`;

export const DEACTIVATE_USER = gql`
  mutation DeactivateUser($id: ID!) {
    deleteUser(id: $id) {
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
  }
`;

export const ACTIVATE_USER = gql`
  mutation ActivateUser($id: ID!) {
    activateUser(id: $id) {
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
  }
`;
