import {useMutation, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {ReactNativeFile} from 'apollo-upload-client';
import {useEffect, useState} from 'react';
import {Asset} from 'react-native-image-picker';
import {updateUserUpdateCache} from '../graphql/cache/users';
import {UPDATE_IMAGE_CLOUDINARY} from '../graphql/mutations';
import {UPDATE_USER} from '../graphql/mutations/users';
import {GET_USER} from '../graphql/queries';
import {GET_ROLES} from '../graphql/queries/roles';
import {takePhoto, takePhotoFromGallery} from '../helpers/utils';
import {GetUserRes, GetRolesRes} from '../interfaces';
import {useForm} from './useForm';

export const useUser = (id: string, name: string) => {
  const {goBack} = useNavigation();
  const [tempImage, setTempImage] = useState<Asset | null>();
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: userData,
    loading: loadingGet,
    error: getUserError,
    refetch,
  }: GetUserRes = useQuery(GET_USER, {
    variables: {id},
  });
  const [
    updateUser,
    {loading: loadingUpdate, error: updateUserError, reset: resetUpdateUser},
  ] = useMutation(UPDATE_USER);
  const [
    updateImage,
    {
      loading: loadingUpdateImage,
      error: updateUserImageError,
      reset: resetUpdateImage,
    },
  ] = useMutation(UPDATE_IMAGE_CLOUDINARY);

  const userFromApi = userData?.getUser;
  const {data: rolesData, error: getRolesError}: GetRolesRes =
    useQuery(GET_ROLES);
  const roles = rolesData?.getRoles.roles;

  const refetchUser = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const {
    form: user,
    onChange,
    setFormValues,
  } = useForm({
    id: '',
    email: '',
    name: '',
    role: '',
    image: '',
  });

  useEffect(() => {
    setFormValues({
      id: userFromApi?.id || id,
      name: userFromApi?.name || name,
      email: userFromApi?.email || '',
      role: userFromApi?.role.id || '',
      image: userFromApi?.image || '',
    });
  }, [id, name, setFormValues, userFromApi]);

  const updateUserFunction = async () => {
    await updateUser({
      variables: {
        user: {
          id,
          name: user.name,
          role: user.role,
          // // password,
        },
      },
      onError: error => {
        console.log(error);
        resetUpdateUser();
      },
      onCompleted: () => goBack(),
    });

    if (tempImage) uploadImage(tempImage);
  };

  const uploadImage = async (data: Asset) => {
    const fileToUpload = new ReactNativeFile({
      uri: data.uri!,
      type: data.type,
      name: data.fileName,
    });

    updateImage({
      variables: {
        image: fileToUpload,
        id,
        collection: 'users',
      },
      onError: error => {
        console.log(error);
        resetUpdateImage();
      },
      onCompleted: () => goBack(),
      update: updateUserUpdateCache,
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

  return {
    tempImage,
    user,
    error:
      getUserError || getRolesError || updateUserError || updateUserImageError,
    roles,
    loading: loadingGet,
    loadingMutation: loadingUpdate || loadingUpdateImage,
    refreshing,
    modalVisible,
    openModal,
    closeModal,
    updateUserFunction,
    onChange,
    takePhotoHandler,
    takePhotoFromGalleryHandler,
    refetchUser,
  };
};
