import {QueryResult} from '@apollo/client';
export interface GetRolesResponse {
  getRoles: GetRoles;
}

export interface GetRoles {
  roles: Role[];
  count: number;
}

export interface Role {
  id: string;
  name: string;
}

export type GetRolesRes = QueryResult<GetRolesResponse>;
