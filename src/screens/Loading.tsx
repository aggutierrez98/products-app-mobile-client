import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 999,
        height: '100%',
        width: '100%',
      }}>
      <ActivityIndicator size={50} color="#EFEFEF" />
    </View>
  );
};
