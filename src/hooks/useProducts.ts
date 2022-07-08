import {useMutation, useQuery} from '@apollo/client';
import {useState} from 'react';
import {DELETE_PRODUCT} from '../graphql/mutations';
import {GET_PRODUCTS} from '../graphql/queries';
import {GetProductsRes} from '../interfaces';

export const useProducts = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [deleteProduct, {loading: loadingDelete}] = useMutation(DELETE_PRODUCT);
  const {
    data,
    refetch,
    reobserve,
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
      update: (cache, {data: productToDelete}) => {
        const idToDelete = productToDelete.deleteProduct.id;
        const normalizedId = cache.identify({
          id: idToDelete,
          __typename: 'Product',
        });
        cache.evict({id: normalizedId});
        cache.gc();
      },
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
    refreshing,
    loading: loadingDelete || loadingGet,
    loadProductsFromBackend,
    deleteProductFunc,
  };
};
