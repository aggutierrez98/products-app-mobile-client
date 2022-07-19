import {QueryResult} from '@apollo/client';
import {CurrentUserResponse, User} from './user';
export interface AuthResultsInterface {
  user: User;
  token?: string;
}

export type CurrentUserRes = QueryResult<CurrentUserResponse>;

export interface CreateUserRes {
  createUser: AuthResultsInterface;
}
export interface LoginRes {
  login: AuthResultsInterface;
}
