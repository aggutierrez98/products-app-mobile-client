import {DrawerActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const LeftHeaderWithMenuButton = () => {
  const {dispatch} = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => dispatch(DrawerActions.openDrawer())}>
      <Icon style={{marginRight: 15}} name="reorder" size={23} color="black" />
    </TouchableOpacity>
  );
};
