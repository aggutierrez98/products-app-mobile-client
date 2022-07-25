import React from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from 'styled-components';
import {StatusBarContainer} from './styles';
const GeneralStatusBarColor = ({...props}) => {
  const {colors} = useTheme();
  return (
    <StatusBarContainer>
      <StatusBar backgroundColor={colors.statusBarBackground} {...props} />
    </StatusBarContainer>
  );
};
export default GeneralStatusBarColor;
