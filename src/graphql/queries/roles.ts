import {gql} from '@apollo/client';

export const GET_ROLES = gql`
  query GetRoles {
    getRoles {
      ... on GetRolesResults {
        roles {
          id
          name
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
