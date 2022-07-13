import {useMutation, useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {LOGIN, REGISTER} from '../graphql/mutations';
import {CURRENT_USER} from '../graphql/queries/auth';
import ExpireStorage from '../helpers/saveDataToStorage';
import {CurrentUserResponse} from '../interfaces';
import {useForm} from './useForm';

export const useAuth = () => {
  const {
    data: userData,
    loading: userLoading,
    refetch,
    // // error,
    client,
  } = useQuery(CURRENT_USER);
  const user = (userData as CurrentUserResponse)?.currentUser;

  const [loadingFromRefetch, setLoadingFromRefetch] = useState(false);

  useEffect(() => {
    if (user) {
      client.onClearStore(async () => {
        setLoadingFromRefetch(true);
        await refetch();
        setLoadingFromRefetch(false);
      });
    }
  }, [client, refetch, user]);

  const [error, setError] = useState(null);
  const {name, email, password, onChange} = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [loginFunc, {data: loginData, loading: loginLoading}] = useMutation(
    LOGIN,
    {
      update: (cache, {data}) => {
        if (data.login.error) return;

        cache.writeQuery({
          query: CURRENT_USER,
          data: {currentUser: data.login.user},
        });
      },
      onCompleted: data => {
        if (data.login.error) return;

        ExpireStorage.setItem('x-token', data.login.token, 60);
      },
    },
  );

  const [register, {data: registerData, loading: registerLoading}] =
    useMutation(REGISTER, {
      update: (cache, {data}) => {
        if (data.createUser.error) return;

        cache.writeQuery({
          query: CURRENT_USER,
          data: {currentUser: data.createUser.user},
        });
      },
      onCompleted: data => {
        if (data.createUser.error) return;

        const dataToStorage = {
          id: data.login.user.id,
          token: data.login.token,
        };
        ExpireStorage.setItem('x-token', dataToStorage, 60);
      },
    });

  useEffect(() => {
    if (loginData?.login.error || registerData?.createUser.error) {
      setError(
        loginData?.login.error.message ||
          registerData?.createUser.error.message,
      );
    } else {
      setError(null);
    }
  }, [loginData?.login.error, registerData?.createUser.error]);

  const loginHandler = () => {
    loginFunc({
      variables: {email, password},
    });
  };

  const registerHandler = () => {
    register({variables: {user: {name, email, password, role: 'USER_ROLE'}}});
  };

  const logout = async () => {
    await ExpireStorage.removeItem('x-token');
    await client.clearStore();
  };

  return {
    user,
    name,
    email,
    password,
    loading:
      loginLoading || registerLoading || userLoading || loadingFromRefetch,
    inputError: error,
    onChange,
    loginHandler,
    registerHandler,
    logout,
  };
};
