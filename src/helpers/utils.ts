import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const takePhoto = async () => {
  const resp = await launchCamera({
    mediaType: 'photo',
    quality: 0.5,
  });
  if (resp.didCancel) return null;
  if (!resp.assets || resp.assets.length === 0) return null;

  return resp.assets[0];
};

export const takePhotoFromGallery = async () => {
  const resp = await launchImageLibrary({
    mediaType: 'photo',
    quality: 0.5,
  });
  if (resp.didCancel) return null;
  if (!resp.assets || resp.assets.length === 0) return null;

  return resp.assets[0];
};
