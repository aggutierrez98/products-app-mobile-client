import {gql} from '@apollo/client';

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      name
      email
      role {
        id
        name
      }
    }
  }
`;
