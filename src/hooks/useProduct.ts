import {useMutation, useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {Asset} from 'react-native-image-picker';
import {CREATE_PRODUCT, UPDATE_PRODUCT} from '../graphql/mutations';
import {GET_CATEGORIES, GET_PRODUCT} from '../graphql/queries';
import {useForm} from './useForm';
import {ReactNativeFile} from 'apollo-upload-client';
import {UPDATE_IMAGE_CLOUDINARY} from '../graphql/mutations';
import {CURRENT_USER} from '../graphql/queries/auth';
import {CurrentUserRes, GetCategoriesRes, GetProductRes} from '../interfaces';
import {
  createProductUpdateCache,
  updateProductUpdateCache,
} from '../graphql/cache/products';
import {takePhoto, takePhotoFromGallery} from '../helpers/utils';
import {useNavigation} from '@react-navigation/native';

export const useProduct = (id: string, name: string) => {
  const {goBack} = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

  const [tempImage, setTempImage] = useState<Asset | null>();

  const {
    form: product,
    onChange,
    setFormValues,
  } = useForm({
    id: '',
    category: '',
    name: '',
    description: '',
    image: '',
    price: '',
  });

  const {
    data: productData,
    refetch,
    loading: loadingGet,
  }: GetProductRes = useQuery(GET_PRODUCT, {
    variables: {id: String(id) || null},
    skip: !id,
  });
  const {data: categoriesData, error: getProductError}: GetCategoriesRes =
    useQuery(GET_CATEGORIES, {});
  const {data: userData, error: getCurrentUserError}: CurrentUserRes = useQuery(
    CURRENT_USER,
    {
      fetchPolicy: 'cache-only',
    },
  );
  const [
    createProduct,
    {loading: loadingCreate, error: createProductError, reset: resetCreate},
  ] = useMutation(CREATE_PRODUCT);
  const [
    updateProduct,
    {loading: loadingUpdate, error: updateProductError, reset: resetUpdate},
  ] = useMutation(UPDATE_PRODUCT);
  const [
    updateImage,
    {
      loading: loadingUpdateImage,
      error: updateImageProductError,
      reset: resetUpdateImage,
    },
  ] = useMutation(UPDATE_IMAGE_CLOUDINARY);

  const refetchProduct = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const productFromApi = productData?.getProduct;
  const categories = categoriesData?.getCategories.categories;

  const saveOrUpdate = async () => {
    if (product.id.length > 0) {
      await updateProduct({
        variables: {
          product: {
            id: product.id,
            category: product.category,
            description: product.description,
            name: product.name,
            price: Number(product.price),
          },
        },
        onError: error => {
          console.log(error);
          resetUpdate();
        },
        onCompleted: () => goBack(),
        update: updateProductUpdateCache,
      });

      if (tempImage) uploadImage(tempImage);
    } else {
      await createProduct({
        variables: {
          product: {
            category: product.category,
            name: product.name,
            description: product.description,
            price: Number(product.price),
            user: userData?.currentUser?.id,
          },
        },
        onError: error => {
          console.log(error);
          resetCreate();
        },
        onCompleted: () => goBack(),
        update: createProductUpdateCache,
      });
    }
  };

  const uploadImage = async (tempImageData: Asset) => {
    const fileToUpload = new ReactNativeFile({
      uri: tempImageData.uri!,
      type: tempImageData.type,
      name: tempImageData.fileName,
    });
    updateImage({
      variables: {
        image: fileToUpload,
        id,
        collection: 'products',
      },
      onError: error => {
        console.log(error);
        resetUpdateImage();
      },
      onCompleted: () => goBack(),
      update: updateProductUpdateCache,
    });
  };

  const takePhotoFromGalleryHandler = async () => {
    const imageAsset = await takePhotoFromGallery();
    setTempImage(imageAsset);
    closeModal();
  };

  const takePhotoHandler = async () => {
    const imageAsset = await takePhoto();
    setTempImage(imageAsset);
    closeModal();
  };

  useEffect(() => {
    setFormValues({
      id: productFromApi?.id || id,
      category: productFromApi?.category.id || '',
      image: productFromApi?.image || '',
      price: String(productFromApi?.price || ''),
      name: productFromApi?.name || name,
      description: productFromApi?.description || '',
    });
  }, [id, name, setFormValues, productFromApi]);

  return {
    product,
    error:
      getProductError ||
      createProductError ||
      updateProductError ||
      updateImageProductError ||
      getCurrentUserError,
    categories,
    tempImage,
    loading: loadingGet,
    loadingMutation: loadingCreate || loadingUpdate || loadingUpdateImage,
    refreshing,
    modalVisible,
    closeModal,
    openModal,
    updateProduct,
    createProduct,
    setFormValues,
    onChange,
    saveOrUpdate,
    takePhotoHandler,
    takePhotoFromGalleryHandler,
    refetchProduct,
  };
};
