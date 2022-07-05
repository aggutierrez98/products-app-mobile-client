import {gql} from '@apollo/client';
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($category: AddCategoryInput!) {
    createCategory(category: $category) {
      ... on Category {
        id
        name
      }
      ... on InputError {
        error {
          message
        }
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      ... on Category {
        id
        name
      }
      ... on InputError {
        error {
          message
        }
      }
    }
  }
`;
