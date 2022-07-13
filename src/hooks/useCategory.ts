import {useMutation, useQuery} from '@apollo/client';
import {useCallback, useEffect, useState} from 'react';
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from '../graphql/mutations/categories';
import {GET_CATEGORIES} from '../graphql/queries';
import {CURRENT_USER} from '../graphql/queries/auth';
import {
  GetCategoriesRes,
  GetCategoriesResponse,
  CurrentUserRes,
  Category,
} from '../interfaces';

export const useCategory = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<{
    title: string | null;
    option: 'Add' | 'Edit';
    categoryData?: {id: string; name: string};
  }>({title: '', option: 'Add'});

  const openModal = useCallback(
    (
      title: string,
      option: 'Add' | 'Edit',
      categoryData?: {id: string; name: string},
    ) => {
      setModalData({title, option, categoryData});
      setModalVisible((prevVisibility: boolean) => !prevVisibility);
      if (categoryData?.name) setCategoryName(categoryData?.name);
      else setCategoryName('');
    },
    [],
  );
  const closeModal = () => setModalVisible(false);

  const {
    data: categoriesData,
    loading: loadingGet,
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
  const [createCategory, {data, loading: loadingCreate}] =
    useMutation(CREATE_CATEGORY);
  const [updateCategory, {loading: loadingUpdate}] =
    useMutation(UPDATE_CATEGORY);

  useEffect(() => {
    if (data?.createCategory.error) {
      setError(data?.createCategory.error.message);
    } else {
      setError(null);
    }
  }, [data?.createCategory.error]);

  const [deleteCategory, {loading: loadingDelete}] =
    useMutation(DELETE_CATEGORY);

  const categories = (categoriesData as GetCategoriesResponse | undefined)
    ?.getCategories.categories;

  const loadProductsFromBackend = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  const handleNameChange = useCallback((value: string) => {
    setCategoryName(value);
  }, []);

  const saveOrUpdateCategory = async (id?: string) => {
    if (id) {
      closeModal();
      await updateCategory({
        variables: {
          category: {
            id,
            name: categoryName,
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
                const newCategories = oldCategoriesData.categories.map(
                  (oldCategory: Category) => {
                    if (oldCategory.id === newCategoryData.id) {
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
        },
      });
    } else {
      closeModal();

      await createCategory({
        variables: {
          category: {
            name: categoryName,
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
    }

    setCategoryName('');
    reobserve();
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
    closeModal();
  };

  return {
    categories,
    refreshing,
    loading: loadingGet,
    loadingMutation: loadingCreate || loadingUpdate || loadingDelete,
    inputError: error,
    categoryName,
    modalVisible,
    modalData,
    saveOrUpdateCategory,
    deleteCategoryHandler,
    loadProductsFromBackend,
    handleNameChange,
    openModal,
    closeModal,
  };
};
