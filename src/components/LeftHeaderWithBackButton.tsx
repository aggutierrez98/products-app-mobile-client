import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const LeftHeaderWithBackButton = () => {
  const {goBack} = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => goBack()}>
      <Icon
        style={{marginRight: 15}}
        name="arrow-back"
        size={23}
        color="black"
      />
    </TouchableOpacity>
  );
};
