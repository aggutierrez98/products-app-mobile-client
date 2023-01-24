export const ERROR_MESSAGES: {[key: string]: string} = {
  //Products
  getProduct: 'Error when getting product',
  getProducts: 'Error when getting products',
  createProduct: 'Error when creating product',
  updateProduct: 'Error when updating product',
  updateImageProduct: 'Error when updating product image',
  deleteProduct: 'Error when deleting product',

  //Users
  getUser: 'Error when getting user',
  getUsers: 'Error when getting users',
  updateUser: 'Error when updating user',
  updateUserImage: 'Error when updating user image',
  activateUser: 'Error when activating user',
  deleteUser: 'Error when deactivating user',

  //Categories
  getCategories: 'Error when getting categories',
  updateCategory: 'Error when updating category',
  createCategory: 'Error when creating category',
  deleteCategory: 'Error when deleting category',

  //Auth
  currentUser: 'Error when loading user data',
  login: 'Error in login',
  register: 'Error in register',
  sessionError: 'Token has expired. Application will logout',

  //Roles
  getRoles: 'Error when getting roles',

  //Server
  serverError: 'An error in server has ocurred for this operation',
};
