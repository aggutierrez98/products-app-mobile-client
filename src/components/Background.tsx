import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View, ViewProps} from 'react-native';

export const Background = (props: ViewProps) => {
  const {name} = useRoute();

  return (
    <View style={{width: '100%', height: '100%', position: 'relative'}}>
      <View
        style={{
          position: 'absolute',
          zIndex: -1,
          backgroundColor: '#112B3C',
          top: name === 'LoginScreen' ? -150 : -120,
          width: name === 'LoginScreen' ? 550 : 625,
          height: 1200,
          transform: [{rotate: '-50deg'}],
        }}
      />
      {props.children}
    </View>
  );
};
