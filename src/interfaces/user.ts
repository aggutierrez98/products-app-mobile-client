import {Role} from './roles';
import {QueryResult} from '@apollo/client';

export interface GetUsersResponse {
  getUsers: GetUsers;
}

export interface GetUserResponse {
  getUser: User;
}

export interface CurrentUserResponse {
  currentUser: User | undefined;
}
export interface GetUsers {
  users: User[];
  count: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: null;
  role: Role;
  active: Boolean;
}

export type GetUsersRes = QueryResult<
  GetUsersResponse,
  {limit: number; skip: number}
>;

export type GetUserRes = QueryResult<GetUserResponse, {id: string}>;

export interface UpdateUserResponse {
  updateUser: User;
}
export interface ActivateUserResponse {
  activateUser: User;
}
export interface DeleteUserResponse {
  deleteUser: User;
}
