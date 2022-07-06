import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ProductScreen} from '../screens/ProductScreen';
import {ProductsScreen} from '../screens/ProductsScreen';
import {Text, TouchableOpacity} from 'react-native';
import {ProtectedNavigationParams} from './ProtectedNavigator';
import {CommonActions, DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
      screenOptions={{
        // headerShown: false,
        title: 'Products',
        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon
              style={{marginRight: 15}}
              name="reorder"
              size={23}
              color="black"
            />
          </TouchableOpacity>
        ),
        contentStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.dispatch(
                  CommonActions.navigate({
                    name: 'ProductScreen',
                    params: {},
                  }),
                )
              }>
              <Text style={{color: 'black'}}>Agregar</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.goBack()}>
              <Icon
                style={{marginRight: 15}}
                name="arrow-back"
                size={23}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
