import {gql} from '@apollo/client';

export const GET_ROLES = gql`
  query GetRoles {
    getRoles {
      roles {
        id
        name
      }
      count
    }
  }
`;
