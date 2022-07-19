import {ApolloCache} from '@apollo/client';
import {DeleteUserResponse, UpdateUserResponse} from '../../interfaces';
import {ActivateUserResponse} from '../../interfaces/user';

export const updateUserUpdateCache = (
  cache: ApolloCache<any>,
  {data: newUserData}: {data?: UpdateUserResponse},
) => {
  cache.modify({
    fields: {
      getUsers(oldGetUsersData) {
        const newUsers = oldGetUsersData.users.map((oldUser: any) => {
          if (oldUser.id === newUserData?.updateUser?.id) {
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
};

export const activateUserUpdateCache = (
  cache: ApolloCache<any>,
  {data: newUserData}: {data?: ActivateUserResponse},
) => {
  cache.modify({
    fields: {
      getUsers(oldGetUsersData) {
        const newUsers = oldGetUsersData.users.map((oldUser: any) => {
          if (oldUser.id === newUserData?.activateUser.id) {
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
};
export const deactivateUserUpdateCache = (
  cache: ApolloCache<any>,
  {data: newUserData}: {data?: DeleteUserResponse},
) => {
  cache.modify({
    fields: {
      getUsers(oldGetUsersData) {
        const newUsers = oldGetUsersData.users.map((oldUser: any) => {
          if (oldUser.id === newUserData?.deleteUser.id) {
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
};
