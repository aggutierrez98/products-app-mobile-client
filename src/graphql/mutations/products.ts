import {gql} from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation createProduct($product: AddProductInput!) {
    createProduct(product: $product) {
      id
      name
      user {
        id
        name
        email
        image
      }
      active
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($product: UpdateProductInput!) {
    updateProduct(product: $product) {
      name
      description
      price
      available
      id
      active
      user {
        id
        name
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
  }
`;

export const UPDATE_IMAGE_CLOUDINARY = gql`
  mutation UpdateImageCloudinary(
    $id: ID!
    $collection: Collections!
    $image: Upload!
  ) {
    updateImageCloudinary(id: $id, collection: $collection, image: $image) {
      ... on Product {
        id
        name
        description
        image
        price
        available
        active
        user {
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
        category {
          id
          name
          user {
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
          active
        }
      }
      ... on User {
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
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      description
      image
      price
      available
      active
      user {
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
      category {
        id
        name
        user {
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
        active
      }
    }
  }
`;
