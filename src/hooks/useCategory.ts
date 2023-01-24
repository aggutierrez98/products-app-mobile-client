import {useMutation, useQuery} from '@apollo/client';
import {useCallback, useState} from 'react';
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from '../graphql/mutations/categories';
import {GET_CATEGORIES} from '../graphql/queries';
import {CURRENT_USER} from '../graphql/queries/auth';
import {
  updateCategoryUpdateCache,
  createCategoryUpdateCache,
  deleteCategoryUpdateCache,
} from '../helpers/categories';
import {
  GetCategoriesRes,
  GetCategoriesResponse,
  CurrentUserRes,
} from '../interfaces';

export const useCategory = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [categoryName, setCategoryName] = useState('');
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
    error: getCategoryError,
    refetch,
    reobserve,
  }: GetCategoriesRes = useQuery(GET_CATEGORIES, {
    fetchPolicy: 'cache-first',
    variables: {
      limit: 5,
      skip: 0,
    },
  });
  const {data: userData, error: getCurrentUserError}: CurrentUserRes =
    useQuery(CURRENT_USER);
  const [
    createCategory,
    {loading: loadingCreate, error: createCategoryError, reset: resetCreate},
  ] = useMutation(CREATE_CATEGORY);
  const [
    updateCategory,
    {loading: loadingUpdate, error: updateCategoryError, reset: resetUpdate},
  ] = useMutation(UPDATE_CATEGORY);
  const [
    deleteCategory,
    {loading: loadingDelete, error: deleteCategoryError, reset: resetDelete},
  ] = useMutation(DELETE_CATEGORY);

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
        update: updateCategoryUpdateCache,
        onError: error => {
          console.log(error);
          resetUpdate();
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
        update: createCategoryUpdateCache,
        onError: error => {
          console.log(error);
          resetCreate();
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
      update: deleteCategoryUpdateCache,
      onError: error => {
        console.log(error);
        resetDelete();
      },
    });
    closeModal();
  };

  return {
    categories,
    refreshing,
    loading: loadingGet,
    loadingMutation: loadingCreate || loadingUpdate || loadingDelete,
    error:
      getCategoryError ||
      createCategoryError ||
      updateCategoryError ||
      deleteCategoryError ||
      getCurrentUserError,
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
