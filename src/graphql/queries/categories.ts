import {gql} from '@apollo/client';

export const GET_CATEGORIES = gql`
  query getCategories($limit: Int, $skip: Int) {
    getCategories(limit: $limit, skip: $skip) {
      ... on GetCategoriesResults {
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
      ... on InputError {
        error {
          message
        }
      }
    }
  }
`;
