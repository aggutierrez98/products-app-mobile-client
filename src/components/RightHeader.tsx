import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export const RightHeader = ({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#2011c4',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        margin: 0,
      }}
      activeOpacity={0.8}
      onPress={onPress}>
      <Text style={{color: 'white'}}>{text}</Text>
    </TouchableOpacity>
  );
};
