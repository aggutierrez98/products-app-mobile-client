import {useRoute} from '@react-navigation/native';
import React from 'react';
import {ViewProps} from 'react-native';
import {
  BackgroundBox,
  BackgroundContainer,
} from '../theme/components/Background';

export const Background = (props: ViewProps) => {
  const {name} = useRoute();

  return (
    <BackgroundContainer>
      <BackgroundBox routeName={name} />
      {props.children}
    </BackgroundContainer>
  );
};
