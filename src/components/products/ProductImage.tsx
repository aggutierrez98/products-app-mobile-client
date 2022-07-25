import React from 'react';
import {useWindowDimensions} from 'react-native';
import {FadeInImage} from '../FadeInImage';
import {ActivityIndicator} from '../FadeInImage/styles';
import {ProductImageContainer} from './styles';

interface Props {
  openModal: () => void;
  loading: boolean;
  tempImage: string | undefined;
  image: string | undefined;
}

export const ProductImage = ({image, loading, openModal, tempImage}: Props) => {
  const {width} = useWindowDimensions();

  return (
    <ProductImageContainer activeOpacity={0.8} onPress={openModal}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FadeInImage
          source={
            tempImage || image
              ? {
                  uri: tempImage || image,
                }
              : require('../../assets/no-image.jpg')
          }
          style={{
            width,
            height: '100%',
          }}
        />
      )}
    </ProductImageContainer>
  );
};
