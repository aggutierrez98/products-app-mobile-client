import {CreateUserRes, LoginRes} from '../interfaces';
import ExpireStorage from './saveDataToStorage';

export const registerOnCompleted = (data: CreateUserRes) => {
  const dataToStorage = {
    id: data.createUser.user.id,
    token: data.createUser.token,
  };
  ExpireStorage.setItem('x-token', dataToStorage, 60);
};

export const loginOnCompleted = (data: LoginRes) => {
  ExpireStorage.setItem('x-token', data.login.token, 60);
};
