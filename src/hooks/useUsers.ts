import {useMutation, useQuery} from '@apollo/client';
import {useMemo, useState} from 'react';
import {
  activateUserUpdateCache,
  deactivateUserUpdateCache,
} from '../graphql/cache/users';
import {ACTIVATE_USER, DEACTIVATE_USER} from '../graphql/mutations/users';
import {GET_USERS} from '../graphql/queries';
import {GetUsersRes} from '../interfaces';

export const useUsers = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(0);

  const [
    deactivateUser,
    {
      loading: loadingDeactivate,
      error: deactivateUserError,
      reset: resetDeactivate,
    },
  ] = useMutation(DEACTIVATE_USER);
  const [
    activateUser,
    {loading: loadingActivate, error: activateUserError, reset: resetActivate},
  ] = useMutation(ACTIVATE_USER);
  const {
    data,
    refetch,
    reobserve,
    error: getUsersError,
    loading: loadingGet,
  }: GetUsersRes = useQuery(GET_USERS, {
    fetchPolicy: 'cache-first',
    variables: {
      limit: 5,
      skip: 0,
    },
  });

  const options = useMemo(
    () => [
      {name: 'Actives', value: 0},
      {name: 'Inactives', value: 1},
    ],
    [],
  );

  const changeFilter = (option: number) => setSelectedFilter(option);

  const shouldActive = selectedFilter === 0;
  const users = data?.getUsers?.users?.filter(
    user => user.active === shouldActive,
  );

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
      onError: error => {
        console.log(error);
        resetDeactivate();
      },
      update: deactivateUserUpdateCache,
    });
  };

  const activateUserFunc = async (id: string) => {
    activateUser({
      variables: {id},
      onCompleted: () => {
        reobserve();
      },
      onError: error => {
        console.log(error);
        resetActivate();
      },
      update: activateUserUpdateCache,
    });
  };

  return {
    users,
    error: deactivateUserError || activateUserError || getUsersError,
    refreshing,
    options,
    loading: loadingDeactivate || loadingActivate || loadingGet,
    selectedFilter,
    loadProductsFromBackend,
    deactivateUserFunc,
    activateUserFunc,
    changeFilter,
  };
};
