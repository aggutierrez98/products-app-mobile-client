import {ApolloCache} from '@apollo/client';
import {Category, CreateCategoryRes, UpdateCategoryRes} from '../interfaces';
import {DeleteCategoryRes} from '../interfaces/categories';

export const createCategoryUpdateCache = (
  cache: ApolloCache<any>,
  {data: newCategoryData}: {data?: CreateCategoryRes},
) => {
  cache.modify({
    fields: {
      getCategories(oldCategoriesData) {
        return {
          ...oldCategoriesData,
          categories: [...oldCategoriesData.categories, {...newCategoryData}],
        };
      },
    },
  });
};

export const updateCategoryUpdateCache = (
  cache: ApolloCache<any>,
  {data: newCategoryData}: {data?: UpdateCategoryRes},
) => {
  cache.modify({
    fields: {
      getCategories(oldCategoriesData) {
        const newCategories = oldCategoriesData.categories.map(
          (oldCategory: Category) => {
            if (oldCategory.id === newCategoryData?.updateCategory.id) {
              return newCategoryData;
            } else return oldCategory;
          },
        );

        return {
          ...oldCategoriesData,
          categories: newCategories,
        };
      },
    },
  });
};

export const deleteCategoryUpdateCache = (
  cache: ApolloCache<any>,
  {data: categoryToDelete}: {data?: DeleteCategoryRes},
) => {
  const idToDelete = categoryToDelete?.deleteCategory.id;
  const normalizedId = cache.identify({
    id: idToDelete,
    __typename: 'Category',
  });
  cache.evict({id: normalizedId});
  cache.gc();
};
