import {useMutation, useQuery} from '@apollo/client';
import {useEffect, useState, useCallback} from 'react';
import {loginUpdateCache, registerUpdateCache} from '../graphql/cache/auth';
import {LOGIN, REGISTER} from '../graphql/mutations';
import {CURRENT_USER} from '../graphql/queries/auth';
import {registerOnCompleted, loginOnCompleted} from '../helpers/auth';
import ExpireStorage from '../helpers/saveDataToStorage';
import {CurrentUserResponse} from '../interfaces';
import {useForm} from './useForm';

export const useAuth = () => {
  const {
    data: userData,
    loading: userLoading,
    refetch,
    client,
    error: userError,
  } = useQuery(CURRENT_USER, {
    onError: error => console.log(error),
    fetchPolicy: 'cache-and-network',
  });
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

  const {name, email, password, onChange} = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [
    loginFunc,
    {loading: loginLoading, error: loginError, reset: resetLogin},
  ] = useMutation(LOGIN);
  const [
    register,
    {loading: registerLoading, error: registerError, reset: resetRegister},
  ] = useMutation(REGISTER);

  const loginHandler = () => {
    loginFunc({
      variables: {email, password},
      update: loginUpdateCache,
      onCompleted: loginOnCompleted,
      onError: error => {
        console.log(error);
        resetLogin();
      },
    });
  };

  const registerHandler = () => {
    register({
      variables: {user: {name, email, password, role: 'USER_ROLE'}},
      update: registerUpdateCache,
      onCompleted: registerOnCompleted,
      onError: error => {
        console.log(error);
        resetRegister();
      },
    });
  };

  const logout = useCallback(async () => {
    await ExpireStorage.removeItem('x-token');
    await client.clearStore();
  }, [client]);

  return {
    user,
    name,
    email,
    password,
    loading:
      loginLoading || registerLoading || userLoading || loadingFromRefetch,
    inputError: loginError || registerError,
    userError,
    onChange,
    loginHandler,
    registerHandler,
    logout,
  };
};
