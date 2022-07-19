import {gql} from '@apollo/client';

export const GET_CATEGORIES = gql`
  query getCategories($limit: Int, $skip: Int) {
    getCategories(limit: $limit, skip: $skip) {
      categories {
        id
        name
        user {
          name
          email
        }
      }
      count
    }
  }
`;
