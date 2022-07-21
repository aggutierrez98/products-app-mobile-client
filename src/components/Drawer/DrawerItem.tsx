import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProtectedNavigationParams} from '../../navigator/ProtectedNavigator';
import {ItemButton, ItemIcon, ItemText} from './styles';

type NavigationProps = NativeStackNavigationProp<ProtectedNavigationParams>;

interface Props {
  title: string;
  icon: string;
  screen?: keyof ProtectedNavigationParams;
  onPress?: () => void;
}

export const DrawerItem = ({title, icon, screen, onPress}: Props) => {
  const {navigate} = useNavigation<NavigationProps>();

  return (
    <ItemButton
      onPress={() => {
        if (screen) navigate(screen);
        else if (onPress) onPress();
        else return;
      }}>
      <ItemIcon name={icon} />
      <ItemText>{title}</ItemText>
    </ItemButton>
  );
};
