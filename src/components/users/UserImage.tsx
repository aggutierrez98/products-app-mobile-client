import React from 'react';
import {ImageContainer} from './styles';
import {ActivityIndicator} from '../../theme/detailScreenStyles';
import {FadeInImage} from '../FadeInImage';

interface Props {
  openModal: () => void;
  loading: boolean;
  tempImage: string | undefined;
  image: string | undefined;
}

export const UserImage = ({image, tempImage, loading, openModal}: Props) => {
  return (
    <ImageContainer activeOpacity={0.8} onPress={openModal}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FadeInImage
          source={
            tempImage || image
              ? {
                  uri: tempImage || image,
                }
              : require('../../assets/avatar-placeholder.png')
          }
          style={{
            width: 250,
            height: 250,
            borderRadius: 150,
          }}
        />
      )}
    </ImageContainer>
  );
};
