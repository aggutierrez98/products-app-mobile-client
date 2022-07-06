import {gql, useMutation, useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {
  ImagePickerResponse,
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
  const [tempUri, setTempUri] = useState<string>();
  const {
    form: product,
    onChange,
    setFormValues,
  } = useForm({
    id: '',
    category: '',
    name: '',
    image: '',
    price: '',
  });

  const {data: productData}: GetProductRes = useQuery(GET_PRODUCT, {
    variables: {id: String(id) || null},
    skip: !id,
  });
  const {data: categoriesData}: GetCategoriesRes = useQuery(GET_CATEGORIES, {});
  const {data: userData}: CurrentUserRes = useQuery(CURRENT_USER, {
    fetchPolicy: 'cache-only',
  });
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateImage] = useMutation(UPDATE_IMAGE_CLOUDINARY);

  const productFromApi = productData?.getProduct;
  const categories = categoriesData?.getCategories.categories;

  const saveOrUpdate = async () => {
    if (product.id.length > 0) {
      await updateProduct({
        variables: {
          product: {
            id: product.id,
            category: product.category,
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
    } else {
      await createProduct({
        variables: {
          product: {
            category: product.category,
            name: product.name,
            price: Number(product.price),
            user: userData?.currentUser?.id,
          },
        },
        onError: error => {
          console.log({error});
        },
        update: (cache, {data: dataOfProduct}) => {
          cache.modify({
            fields: {
              getProducts(oldProductData) {
                const newProductRef = cache.writeFragment({
                  data: dataOfProduct.createProduct,
                  fragment: gql`
                    fragment _ on Product {
                      id
                      name
                      user {
                        id
                        name
                        email
                        image
                      }
                      active
                    }
                  `,
                });
                return {
                  ...oldProductData,
                  products: [...oldProductData.products, newProductRef],
                };
              },
            },
          });
          // // cache.updateQuery(
          // //   {
          // //     query: GET_PRODUCTS,
          // //     variables: {
          // //       limit: 5,
          // //       skip: 0,
          // //     },
          // //   },
          // //   datensio => {
          // //     console.log({datensio});

          // //     const oldGetProducts = datensio?.oldGetProducts;
          // //     const {products = []} = oldGetProducts;

          // //     return {
          // //       getProducts: {
          // //         ...oldGetProducts,
          // //         products: [...products, dataOfProduct],
          // //       },
          // //     };
          // //   },
          // // );
        },
      });
    }
  };

  const uploadImage = async (data: ImagePickerResponse) => {
    const fileToUpload = new ReactNativeFile({
      uri: data.assets![0].uri!,
      type: data.assets![0].type,
      name: data.assets![0].fileName,
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

        setTempUri(resp.assets[0].uri);
        uploadImage(resp);
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

        setTempUri(resp.assets[0].uri);
        uploadImage(resp);
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
    });
  }, [id, name, setFormValues, productFromApi]);

  return {
    product,
    categories,
    tempUri,
    updateProduct,
    createProduct,
    setFormValues,
    onChange,
    saveOrUpdate,
    takePhoto,
    takePhotoFromGallery,
  };
};
