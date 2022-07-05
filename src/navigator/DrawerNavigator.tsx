import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {ProductsNavigator} from './ProductsNavigator';
import {ProtectedScreen} from '../screens/ProtectedScreen';
import {useWindowDimensions} from 'react-native';
import {CustomDrawer} from '../components/Drawer';
import {CategoriesScreen} from '../screens/CategoriesScreen';
import {UsersNavigator} from './UsersNavigator';

export type MainNavigationParams = {
  ProductsNavigator: undefined;
  UsersNavigator: undefined;
  CategoriesScreen: undefined;
  ProtectedScreen: undefined;
};

const Drawer = createDrawerNavigator<MainNavigationParams>();

const DrawerNavigator = () => {
  const {width} = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        // headerShown: false,
        drawerType: width >= 768 ? 'permanent' : 'front',
      }}>
      <Drawer.Screen
        name="ProductsNavigator"
        options={{title: 'Products'}}
        component={ProductsNavigator}
      />
      <Drawer.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{
          title: 'Categories',
          headerShadowVisible: false,
          // contentStyle: {backgroundColor: 'white'},
        }}
      />
      <Drawer.Screen
        name="UsersNavigator"
        options={{title: 'Users'}}
        component={UsersNavigator}
      />
      <Drawer.Screen name="ProtectedScreen" component={ProtectedScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
