import {gql} from '@apollo/client';
export const GET_PRODUCTS = gql`
  query getProducts($limit: Int, $skip: Int) {
    getProducts(limit: $limit, skip: $skip) {
      products {
        name
        description
        price
        available
        id
        active
        image
        user {
          id
          name
          email
          role {
            id
            name
          }
        }
        category {
          id
          name
          active
          user {
            id
            name
            email
            role {
              id
              name
            }
          }
        }
      }
      count
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      description
      price
      image
      available
      active
      user {
        id
        name
      }
      category {
        id
        name
        active
      }
    }
  }
`;
