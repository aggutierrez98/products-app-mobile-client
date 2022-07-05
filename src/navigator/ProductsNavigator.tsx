import React, {useEffect} from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ProductScreen} from '../screens/ProductScreen';
import {ProductsScreen} from '../screens/ProductsScreen';
import {Text, TouchableOpacity} from 'react-native';
import {MainNavigationParams} from './DrawerNavigator';
import {CommonActions} from '@react-navigation/native';

export type ProductsStackParams = {
  ProductsScreen: undefined;
  ProductScreen: {id?: string; name?: string};
};

const Stack = createNativeStackNavigator<ProductsStackParams>();

interface Props
  extends NativeStackScreenProps<MainNavigationParams, 'ProductsNavigator'> {}

export const ProductsNavigator = ({navigation}: Props) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 20}}
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
    });
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        contentStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        // options={{title: 'Productos'}}
      />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
