import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export const LoadingScreen = () => {
  console.log('aca?');

  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 999,
        height: '100%',
        width: '100%',
      }}>
      <ActivityIndicator size={50} color="black" />
    </View>
  );
};
