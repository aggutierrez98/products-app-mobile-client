import {QueryResult} from '@apollo/client';
import {User} from './user';
export interface GetCategoriesResponse {
  getCategories: GetCategories;
}

export interface GetCategories {
  categories: Category[];
  count: number;
}

export interface Category {
  id: string;
  name: string;
  user: User;
}

export type GetCategoriesRes = QueryResult<
  GetCategoriesResponse,
  {limit: number; skip: number}
>;
