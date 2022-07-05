import {useMutation} from '@apollo/client';
import {useEffect, useState} from 'react';
import {LOGIN, REGISTER} from '../graphql/mutations';
import {GET_USER} from '../graphql/queries';
import ExpireStorage from '../helpers/saveDataToStorage';
import {useForm} from './useForm';

export const useAuth = () => {
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

        const newData = {getUser: data.login.user};
        cache.writeQuery({query: GET_USER, data: newData});
      },
      onCompleted: data => {
        if (data.login.error) return;

        const dataToStorage = {
          id: data.login.user.id,
          token: data.login.token,
        };
        ExpireStorage.setItem('x-token', dataToStorage, 60);
      },
    },
  );

  const [register, {data: registerData, loading: registerLoading}] =
    useMutation(REGISTER, {
      update: (cache, {data}) => {
        console.log({data});
        if (data.createUser.error) return;

        const newData = {getUser: data.login.user};
        cache.writeQuery({query: GET_USER, data: newData});
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

  return {
    name,
    email,
    password,
    loading: loginLoading || registerLoading,
    inputError: error,
    onChange,
    loginHandler,
    registerHandler,
  };
};
