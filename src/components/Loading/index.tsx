import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components';
import {LoadingContainer} from './styles';

export const Loading = () => {
  const {colors} = useTheme();

  return (
    <LoadingContainer>
      <ActivityIndicator size={50} color={colors.text} />
    </LoadingContainer>
  );
};
