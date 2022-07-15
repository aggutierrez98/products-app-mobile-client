import React, {useState} from 'react';
import {Animated, ImageStyle, ImageURISource, StyleProp} from 'react-native';
import {useAnimation} from '../hooks/useAnimation';
import {
  ActivityIndicator,
  ImageContainer,
} from '../theme/components/FadeInImage';
import {defaultStyles} from '../theme/defaultStlyes';

interface Props {
  source: ImageURISource;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({source, style = {}}: Props) => {
  const {opacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };

  const onError = (_: any) => {
    setIsLoading(false);
  };

  return (
    <ImageContainer style={defaultStyles.shadowBox}>
      {isLoading && <ActivityIndicator />}
      <Animated.Image
        source={source}
        onError={onError}
        onLoad={finishLoading}
        style={{
          ...(style as any),
          opacity,
        }}
      />
    </ImageContainer>
  );
};
