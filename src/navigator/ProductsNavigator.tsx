import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ProductScreen} from '../screens/ProductScreen';
import {ProductsScreen} from '../screens/ProductsScreen';
import {ProtectedNavigationParams} from './ProtectedNavigator';
import {CommonActions} from '@react-navigation/native';
import {Header} from '../components/Header';

export type ProductsStackParams = {
  ProductsScreen: undefined;
  ProductScreen: {id?: string; name?: string};
};

const Stack = createNativeStackNavigator<ProductsStackParams>();

interface Props
  extends NativeStackScreenProps<
    ProtectedNavigationParams,
    'ProductsNavigator'
  > {}

export const ProductsNavigator = ({navigation}: Props) => {
  return (
    <Stack.Navigator
      screenOptions={({route: {params, name}}) => {
        const isDetailsScreen = name === 'ProductScreen';
        return {
          header: () => (
            <Header
              title={
                params?.name || (!isDetailsScreen ? 'Products' : 'Add Product')
              }
              backButton={isDetailsScreen}
              text={isDetailsScreen ? undefined : 'Add'}
              onPress={() => {
                navigation.dispatch(
                  CommonActions.navigate({
                    name: 'ProductScreen',
                    params: {},
                  }),
                );
              }}
            />
          ),
        };
      }}>
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
