import {CreateUserRes, LoginRes} from '../interfaces';
import ExpireStorage from './saveDataToStorage';

export const registerOnCompleted = (data: CreateUserRes) => {
  if (data.createUser.error) return;

  const dataToStorage = {
    id: data.createUser.user.id,
    token: data.createUser.token,
  };
  ExpireStorage.setItem('x-token', dataToStorage, 60);
};

export const loginOnCompleted = (data: LoginRes) => {
  if (data.login.error) return;
  ExpireStorage.setItem('x-token', data.login.token, 60);
};
