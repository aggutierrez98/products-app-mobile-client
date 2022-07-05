import {gql} from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation createProduct($product: AddProductInput!) {
    createProduct(product: $product) {
      ... on Product {
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
      ... on InputError {
        error {
          message
        }
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($product: UpdateProductInput!) {
    updateProduct(product: $product) {
      ... on Product {
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
      ... on InputError {
        error {
          message
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
      ... on InputError {
        error {
          message
        }
      }
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation UpdateImage($id: ID!, $collection: Collections!, $image: Upload!) {
    updateImage(id: $id, collection: $collection, image: $image) {
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
      ... on InputError {
        error {
          message
        }
      }
    }
  }
`;
