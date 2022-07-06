export interface ErrorResponseInterface {
  __typename: string;
  error: Error;
}

export interface Error {
  __typename: string;
  message: string;
}

export * from './auth';
export * from './products';
export * from './categories';
export * from './roles';
export * from './user';
