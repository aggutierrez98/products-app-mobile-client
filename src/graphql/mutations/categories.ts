import {gql} from '@apollo/client';
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($category: AddCategoryInput!) {
    createCategory(category: $category) {
      id
      name
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($category: UpdateCategoryInput!) {
    updateCategory(category: $category) {
      id
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
      name
    }
  }
`;
