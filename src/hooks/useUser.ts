import {useMutation, useQuery} from '@apollo/client';
import {ReactNativeFile} from 'apollo-upload-client';
import {useEffect, useState} from 'react';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {UPDATE_IMAGE_CLOUDINARY} from '../graphql/mutations';
import {UPDATE_USER} from '../graphql/mutations/users';
import {GET_USER} from '../graphql/queries';
import {GET_ROLES} from '../graphql/queries/roles';
import {GetUserRes, GetRolesRes} from '../interfaces';
import {useForm} from './useForm';

export const useUser = (id: string, name: string) => {
  const [tempUri, setTempUri] = useState<string>();
  const {data: userData, loading}: GetUserRes = useQuery(GET_USER, {
    variables: {id},
  });
  const [updateUser] = useMutation(UPDATE_USER);
  const userFromApi = userData?.getUser;
  const [updateImage] = useMutation(UPDATE_IMAGE_CLOUDINARY);
  const {data: rolesData}: GetRolesRes = useQuery(GET_ROLES);
  const roles = rolesData?.getRoles.roles;

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

  const updateUserFunction = () => {
    updateUser({
      variables: {
        user: {
          id,
          name: user.name,
          role: user.role,
          // // password,
        },
      },
      onError: err => {
        console.log({err});
      },
    });
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
        collection: 'users',
      },
      onError: error => {
        console.log({error});
      },
      update: (cache, {data: newUserData}) => {
        cache.modify({
          fields: {
            getUsers(oldGetUsersData) {
              const newUsers = oldGetUsersData.users.map((oldUser: any) => {
                if (oldUser.id === newUserData.id) {
                  return newUserData;
                } else return oldUser;
              });

              return {
                ...oldGetUsersData,
                users: newUsers,
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

  return {
    tempUri,
    user,
    roles,
    loading,
    updateUserFunction,
    onChange,
    takePhoto,
    takePhotoFromGallery,
  };
};
