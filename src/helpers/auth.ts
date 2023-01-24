import {CreateUserRes, LoginRes} from '../interfaces';
import ExpireStorage from './saveDataToStorage';

export const registerOnCompleted = (data: CreateUserRes) => {
  ExpireStorage.setItem('x-token', data.createUser.token, 60);
};

export const loginOnCompleted = (data: LoginRes) => {
  ExpireStorage.setItem('x-token', data.login.token, 60);
};
