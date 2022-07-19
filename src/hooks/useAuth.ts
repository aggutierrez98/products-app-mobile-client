import {useMutation, useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
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

  const [loginFunc, {data: loginData, loading: loginLoading}] =
    useMutation(LOGIN);
  const [register, {data: registerData, loading: registerLoading}] =
    useMutation(REGISTER);

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
      update: loginUpdateCache,
      onCompleted: loginOnCompleted,
    });
  };

  const registerHandler = () => {
    register({
      variables: {user: {name, email, password, role: 'USER_ROLE'}},
      update: registerUpdateCache,
      onCompleted: registerOnCompleted,
    });
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
