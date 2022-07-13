import React from 'react';
import {StyleSheet, View} from 'react-native';

export const ItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};

const styles = StyleSheet.create({
  itemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#205375',
    marginVertical: 5,
  },
});
