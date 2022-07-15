import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Alert} from 'react-native';
import {Product} from '../interfaces/products';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {FadeInImage} from './FadeInImage';
import {CardContainer} from '../theme/components/ProductItem';
import {
  DeleteButton,
  Detail,
  Icon,
  Name,
  TextContainer,
} from '../theme/components/CategoryItem';

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
    <CardContainer
      activeOpacity={0.8}
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
        style={{width: 55, height: 55, borderRadius: 5}}
      />
      <TextContainer>
        <Name numberOfLines={1}>{item.name}</Name>
        <Detail numberOfLines={1}>{item.user.name}</Detail>
      </TextContainer>
      <DeleteButton
        activeOpacity={0.7}
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
        <Icon name="delete-outline" />
      </DeleteButton>
    </CardContainer>
  );
};
