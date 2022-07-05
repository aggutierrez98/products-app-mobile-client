export interface GetUsersResponse {
  getUsers: GetUsers;
}

export interface GetUsers {
  users: User[];
  count: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: null;
}
