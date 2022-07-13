import React from 'react';
import {Image, View} from 'react-native';

export const Logo = () => {
  return (
    <View style={{alignItems: 'center', marginBottom: 10}}>
      <Image source={require('../assets/logo.png')} />
    </View>
  );
};
