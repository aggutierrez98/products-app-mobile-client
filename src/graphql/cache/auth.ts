import {ApolloCache} from '@apollo/client';
import {CreateUserRes, LoginRes} from '../../interfaces';
import {CURRENT_USER} from '../queries';

export const loginUpdateCache = (
  cache: ApolloCache<any>,
  {data}: {data?: LoginRes},
) => {
  cache.writeQuery({
    query: CURRENT_USER,
    data: {currentUser: data?.login.user},
  });
};

export const registerUpdateCache = (
  cache: ApolloCache<any>,
  {data}: {data?: CreateUserRes},
) => {
  cache.writeQuery({
    query: CURRENT_USER,
    data: {currentUser: data?.createUser.user},
  });
};
