import * as React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

export default (props: TextProps) => (
  <Text {...props} style={[defaultStlyes.style, props.style]}>
    {props.children}
  </Text>
);

const defaultStlyes = StyleSheet.create({
  style: {
    fontFamily: 'RobotoCondensed-Light',
    color: '#EFEFEF',
  },
});
