import {QueryResult} from '@apollo/client';
import {CurrentUserResponse} from './user';
export interface LoginResultsInterface {
  user: {
    __typename: string;
    active: boolean;
    email: string;
    id: string;
    image: null;
    name: string;
  };
  token?: string;
}

export type CurrentUserRes = QueryResult<CurrentUserResponse>;
