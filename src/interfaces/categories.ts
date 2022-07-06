import {QueryResult} from '@apollo/client';
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
}

export type GetCategoriesRes = QueryResult<
  GetCategoriesResponse,
  {limit: number; skip: number}
>;
