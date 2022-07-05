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
