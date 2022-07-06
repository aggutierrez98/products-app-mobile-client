import {useMutation, useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
} from '../graphql/mutations/categories';
import {GET_CATEGORIES} from '../graphql/queries';
import {CURRENT_USER} from '../graphql/queries/auth';
import {
  GetCategoriesRes,
  GetCategoriesResponse,
  CurrentUserRes,
} from '../interfaces';

export const useCategory = (closeModal: () => void) => {
  const [refreshing, setRefreshing] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState(null);

  const {
    data: categoriesData,
    refetch,
    reobserve,
  }: GetCategoriesRes = useQuery(GET_CATEGORIES, {
    fetchPolicy: 'cache-first',
    variables: {
      limit: 5,
      skip: 0,
    },
  });
  const {data: userData}: CurrentUserRes = useQuery(CURRENT_USER);
  const [createCategory, {data}] = useMutation(CREATE_CATEGORY);

  useEffect(() => {
    if (data?.createCategory.error) {
      setError(data?.createCategory.error.message);
    } else {
      setError(null);
    }
  }, [data?.createCategory.error]);

  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const categories = (categoriesData as GetCategoriesResponse | undefined)
    ?.getCategories.categories;

  const loadProductsFromBackend = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  const handleNameChange = (value: string) => {
    setNewCategoryName(value);
  };

  const deleteCategoryHandler = (id: string) => {
    deleteCategory({
      variables: {id},
      onCompleted: () => {
        reobserve();
      },
      onError: err => {
        console.log({err});
      },
      update: (cache, {data: categoryToDelete}) => {
        const idToDelete = categoryToDelete.deleteCategory.id;
        const normalizedId = cache.identify({
          id: idToDelete,
          __typename: 'Category',
        });
        cache.evict({id: normalizedId});
        cache.gc();
      },
    });
  };

  const createCategoryHandler = async () => {
    await createCategory({
      variables: {
        category: {
          name: newCategoryName,
          user: userData?.currentUser?.id,
        },
      },
      onError: err => {
        console.log({err});
      },
      update: (cache, {data: newCategoryData}) => {
        cache.modify({
          fields: {
            getCategories(oldCategoriesData) {
              if (newCategoryData.createCategory.error)
                return oldCategoriesData;

              return {
                ...oldCategoriesData,
                categories: [
                  ...oldCategoriesData.categories,
                  {...newCategoryData},
                ],
              };
            },
          },
        });
      },
    });

    closeModal();
    setNewCategoryName('');
    reobserve();
  };

  return {
    refreshing,
    categories,
    inputError: error,
    createCategoryHandler,
    deleteCategoryHandler,
    loadProductsFromBackend,
    newCategoryName,
    handleNameChange,
  };
};
