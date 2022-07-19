import {DrawerActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  HeaderButton,
  HeaderButtonText,
  HeaderContainer,
  HeaderIcon,
  HeaderTitle,
  LeftContainer,
} from './styles';

export const Header = ({
  backButton = false,
  title,
  text,
  onPress,
  children,
}: {
  backButton?: boolean;
  title?: string;
  text?: string;
  onPress?: Function;
  children?: Element | Element[];
  childrenProps?: any;
}) => {
  const {dispatch, goBack} = useNavigation();

  return (
    <HeaderContainer>
      <LeftContainer>
        {backButton ? (
          <TouchableOpacity activeOpacity={0.5} onPress={() => goBack()}>
            <HeaderIcon name="arrow-back" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => dispatch(DrawerActions.openDrawer())}>
            <HeaderIcon name="reorder" />
          </TouchableOpacity>
        )}
        <HeaderTitle>{title}</HeaderTitle>
      </LeftContainer>

      {onPress && text && (
        <HeaderButton activeOpacity={0.8} onPress={() => onPress()}>
          <HeaderButtonText>{text}</HeaderButtonText>
        </HeaderButton>
      )}
      {children}
    </HeaderContainer>
  );
};
