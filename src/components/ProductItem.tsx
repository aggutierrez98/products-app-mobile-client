import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Product} from '../interfaces/products';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {FadeInImage} from './FadeInImage';
import Text from '../components/CustomText';

type NavigationProps = NativeStackNavigationProp<ProductsStackParams>;

export const ProductItem = ({
  item,
  deleteProductFunc,
}: {
  item: Product;
  deleteProductFunc: (id: string) => void;
}) => {
  const {navigate} = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cardContainer}
      onPress={() => {
        navigate('ProductScreen', {
          id: item.id,
          name: item.name,
        });
      }}>
      <FadeInImage
        source={
          item?.image
            ? {
                uri: item?.image,
              }
            : require('../assets/no-image.jpg')
        }
        style={styles.productImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.productUserName} numberOfLines={1}>
          {item.user.name}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            'Are you sure to delete?',
            'When pressed it cannot be undone',
            [
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                  deleteProductFunc(item.id);
                },
              },
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {},
              },
            ],
          );
        }}>
        <Icon name="delete-outline" size={27.5} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  productName: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: -5,
  },
  productUserName: {
    flex: 1,
    fontSize: 14,
    color: '#b5b5b5',
    marginHorizontal: 10,
  },
  deleteButton: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#af0303',
  },
  cardContainer: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productImage: {width: 55, height: 55, borderRadius: 5},
});
