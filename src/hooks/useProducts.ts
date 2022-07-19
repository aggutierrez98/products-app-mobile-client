import {useMutation, useQuery} from '@apollo/client';
import {useState} from 'react';
import {deleteProductUpdateCache} from '../graphql/cache/products';
import {DELETE_PRODUCT} from '../graphql/mutations';
import {GET_PRODUCTS} from '../graphql/queries';
import {GetProductsRes} from '../interfaces';

export const useProducts = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [deleteProduct, {loading: loadingDelete, error: deleteProductError}] =
    useMutation(DELETE_PRODUCT);
  const {
    data,
    refetch,
    reobserve,
    error: getProductsError,
    loading: loadingGet,
  }: GetProductsRes = useQuery(GET_PRODUCTS, {
    fetchPolicy: 'cache-first',
    variables: {
      limit: 5,
      skip: 0,
    },
  });

  const deleteProductFunc = async (id: string) => {
    deleteProduct({
      variables: {id},
      onCompleted: () => {
        reobserve();
      },
      onError: err => {
        console.log({err});
      },
      update: deleteProductUpdateCache,
    });
  };

  const products = data?.getProducts.products;

  const loadProductsFromBackend = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  return {
    products,
    error: deleteProductError || getProductsError,
    refreshing,
    loading: loadingDelete || loadingGet,
    loadProductsFromBackend,
    deleteProductFunc,
  };
};
