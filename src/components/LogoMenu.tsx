import React from 'react';
import {View} from 'react-native';
import Text from '../components/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {componentStyles} from './styles';

export const LogoMenu = () => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: '#F66B0E',
          fontSize: 25,
          fontFamily: 'RobotoCondensed-Bold',
          ...componentStyles.textShadowStyle,
        }}>
        PRODUCTS APP
      </Text>
      <Icon
        name="card-giftcard"
        size={100}
        color="#F66B0E"
        style={{
          ...componentStyles.textShadowStyle,
        }}
      />
    </View>
  );
};
