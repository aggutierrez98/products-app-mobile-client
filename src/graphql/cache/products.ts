import {ApolloCache} from '@apollo/client';
import {
  CreateProductResponse,
  DeleteProductResponse,
  Product,
  UpdateProductResponse,
} from '../../interfaces';

export const createProductUpdateCache = (
  cache: ApolloCache<any>,
  {data: newProductData}: {data?: CreateProductResponse},
) => {
  cache.modify({
    fields: {
      getProducts(oldProductsData) {
        return {
          ...oldProductsData,
          products: [...oldProductsData.products, {...newProductData}],
        };
      },
    },
  });
};

export const updateProductUpdateCache = (
  cache: ApolloCache<any>,
  {data: newDataOfProduct}: {data?: UpdateProductResponse},
) => {
  cache.modify({
    fields: {
      getProducts(oldGetProductData) {
        const newProducts = oldGetProductData.products.map(
          (oldProduct: Product) => {
            if (oldProduct.id === newDataOfProduct?.updateProduct.id) {
              return newDataOfProduct;
            } else return oldProduct;
          },
        );

        return {
          ...oldGetProductData,
          products: newProducts,
        };
      },
    },
  });
};

export const deleteProductUpdateCache = (
  cache: ApolloCache<any>,
  {data: productToDelete}: {data?: DeleteProductResponse},
) => {
  const idToDelete = productToDelete?.deleteProduct?.id;
  const normalizedId = cache.identify({
    id: idToDelete,
    __typename: 'Product',
  });
  cache.evict({id: normalizedId});
  cache.gc();
};
