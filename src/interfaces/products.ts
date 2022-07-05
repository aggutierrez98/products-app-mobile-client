export interface GetProductResponse {
  getProduct: Product;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  active: boolean;
  user: User;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  active: boolean;
}

export interface User {
  id: string;
  name: string;
}

export interface GetProductsResponse {
  getProducts: Products;
}

export interface Products {
  products: ProductShort[];
  count: number;
}

export interface ProductShort {
  id: string;
  name: string;
}
