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
