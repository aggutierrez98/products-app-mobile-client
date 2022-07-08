import {useMutation, useQuery} from '@apollo/client';
import {useState} from 'react';
import {DEACTIVATE_USER} from '../graphql/mutations/users';
import {GET_USERS} from '../graphql/queries';
import {GetUsersRes} from '../interfaces';

export const useUsers = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [deactivateUser, {loading: loadingDeactivate}] =
    useMutation(DEACTIVATE_USER);
  const {
    data,
    refetch,
    reobserve,
    loading: loadingGet,
  }: GetUsersRes = useQuery(GET_USERS, {
    fetchPolicy: 'cache-first',
    variables: {
      limit: 5,
      skip: 0,
    },
  });

  const users = data?.getUsers.users;

  const loadProductsFromBackend = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  const deactivateUserFunc = async (id: string) => {
    deactivateUser({
      variables: {id},
      onCompleted: () => {
        reobserve();
      },
      onError: err => {
        console.log({err});
      },
      update: (cache, {data: userToDeactivate}) => {
        const idToDelete = userToDeactivate.deleteUser.id;
        const normalizedId = cache.identify({
          id: idToDelete,
          __typename: 'User',
        });
        cache.evict({id: normalizedId});
        cache.gc();
      },
    });
  };

  return {
    users,
    refreshing,
    loading: loadingDeactivate || loadingGet,
    loadProductsFromBackend,
    deactivateUserFunc,
  };
};
