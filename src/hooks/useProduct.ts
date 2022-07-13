import {useMutation, useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {CREATE_PRODUCT, UPDATE_PRODUCT} from '../graphql/mutations';
import {GET_CATEGORIES, GET_PRODUCT} from '../graphql/queries';
import {useForm} from './useForm';
import {ReactNativeFile} from 'apollo-upload-client';
import {UPDATE_IMAGE_CLOUDINARY} from '../graphql/mutations';
import {CURRENT_USER} from '../graphql/queries/auth';
import {
  CurrentUserRes,
  GetCategoriesRes,
  GetProductRes,
  Product,
} from '../interfaces';

export const useProduct = (id: string, name: string) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

  const [tempImage, setTempImage] = useState<Asset>();

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
  const {data: categoriesData}: GetCategoriesRes = useQuery(GET_CATEGORIES, {});
  const {data: userData}: CurrentUserRes = useQuery(CURRENT_USER, {
    fetchPolicy: 'cache-only',
  });
  const [createProduct, {loading: loadingCreate}] = useMutation(CREATE_PRODUCT);
  const [updateProduct, {loading: loadingUpdate}] = useMutation(UPDATE_PRODUCT);
  const [updateImage, {loading: loadingUpdateImage}] = useMutation(
    UPDATE_IMAGE_CLOUDINARY,
  );

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
          console.log({error});
        },
        update: (cache, {data: newDataOfProduct}) => {
          cache.modify({
            fields: {
              getProducts(oldGetProductData) {
                const newProducts = oldGetProductData.products.map(
                  (oldProduct: Product) => {
                    if (oldProduct.id === newDataOfProduct.id) {
                      return newDataOfProduct;
                    } else return oldProduct;
                  },
                );

                return {
                  ...oldGetProductData,
                  products: newProducts,
                };
              },
            },
          });
        },
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
          console.log({error});
        },
        update: (cache, {data: newProductData}) => {
          cache.modify({
            fields: {
              getProducts(oldProductsData) {
                if (newProductData.createProduct.error) return oldProductsData;

                return {
                  ...oldProductsData,
                  products: [...oldProductsData.products, {...newProductData}],
                };
              },
            },
          });
        },
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
        console.log({error});
      },
      update: (cache, {data: newProductData}) => {
        cache.modify({
          fields: {
            getProducts(oldGetProductData) {
              const newProducts = oldGetProductData.products.map(
                (oldProduct: Product) => {
                  if (oldProduct.id === newProductData.id) {
                    return newProductData;
                  } else return oldProduct;
                },
              );

              return {
                ...oldGetProductData,
                products: newProducts,
              };
            },
          },
        });
      },
    });
  };

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) return;
        if (!resp.assets || resp.assets.length === 0) return;

        setTempImage(resp.assets[0]);
        closeModal();
      },
    );
  };

  const takePhotoFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) return;
        if (!resp.assets || resp.assets.length === 0) return;

        setTempImage(resp.assets[0]);
        closeModal();
      },
    );
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
    takePhoto,
    takePhotoFromGallery,
    refetchProduct,
  };
};
