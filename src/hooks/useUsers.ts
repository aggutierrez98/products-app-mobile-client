import {useMutation, useQuery} from '@apollo/client';
import {useMemo, useState} from 'react';
import {ACTIVATE_USER, DEACTIVATE_USER} from '../graphql/mutations/users';
import {GET_USERS} from '../graphql/queries';
import {GetUsersRes} from '../interfaces';

export const useUsers = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(0);

  const [deactivateUser, {loading: loadingDeactivate}] =
    useMutation(DEACTIVATE_USER);
  const [activateUser, {loading: loadingActivate}] = useMutation(ACTIVATE_USER);
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
      onError: err => {
        console.log({err});
      },
      update: (cache, {data: newUserData}) => {
        cache.modify({
          fields: {
            getUsers(oldGetUsersData) {
              const newUsers = oldGetUsersData.users.map((oldUser: any) => {
                if (oldUser.id === newUserData.id) {
                  return newUserData;
                } else return oldUser;
              });

              return {
                ...oldGetUsersData,
                users: newUsers,
              };
            },
          },
        });
      },
    });
  };

  const activateUserFunc = async (id: string) => {
    activateUser({
      variables: {id},
      onCompleted: () => {
        reobserve();
      },
      onError: err => {
        console.log({err});
      },
      update: (cache, {data: newUserData}) => {
        cache.modify({
          fields: {
            getUsers(oldGetUsersData) {
              const newUsers = oldGetUsersData.users.map((oldUser: any) => {
                if (oldUser.id === newUserData.id) {
                  return newUserData;
                } else return oldUser;
              });

              return {
                ...oldGetUsersData,
                users: newUsers,
              };
            },
          },
        });
      },
    });
  };

  return {
    users,
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
