import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProtectedNavigationParams} from '../navigator/ProtectedNavigator';
import {useAuth} from '../hooks/useAuth';
import {ItemButton, ItemIcon, ItemText} from '../theme/components/DrawerItem';

type NavigationProps = NativeStackNavigationProp<ProtectedNavigationParams>;

interface Props {
  title: string;
  icon: string;
  screen?: keyof ProtectedNavigationParams;
}

export const DrawerItem = ({title, icon, screen}: Props) => {
  const {navigate} = useNavigation<NavigationProps>();
  const {logout} = useAuth();

  return (
    <ItemButton
      onPress={() => {
        if (screen) navigate(screen);
        else logout();
      }}>
      <ItemIcon name={icon} />
      <ItemText>{title}</ItemText>
    </ItemButton>
  );
};
